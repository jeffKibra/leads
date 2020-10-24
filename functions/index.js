const functions = require("firebase-functions");
const path = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db, admin } = require("./admin");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json()); //handle json data
app.use(bodyParser.urlencoded({ extended: false })); //handle form data
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    //credentials: true,
  })
);

app.post("/api/checkEmail", (req, res) => {
  const email = req.body.email;
  console.log(email);
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      console.log(userRecord);
      return res.end(JSON.stringify({ status: "found" }));
    })
    .catch((error) => {
      //console.log(err);
      const code = error.code;
      const msg = error.message;
      console.log({ code, msg });
      if (code === "auth/user-not-found") {
        res.end(JSON.stringify({ status: "new_user" }));
      } else {
        res.end(JSON.stringify({ error }));
      }
    });
});

exports.newUser = functions.auth.user().onCreate(async (user) => {
  return updateProfileRole(user);
});

async function updateProfileRole(user) {
  const userRef = db.collection("users").doc(user.uid);

  let userObject;

  const isAdmin = await db
    .collection("admins")
    .where("email", "==", user.email)
    .get();

  const isExecutive = await db
    .collection("executives")
    .where("email", "==", user.email)
    .get();

  if (isAdmin.size > 0) {
    userObject = { role: "admin" };
  } else if (isExecutive.size > 0) {
    userObject = { role: "executive" };
  } else {
    userObject = { role: "guest" };
  }

  return userRef.set(userObject, { merge: true }).catch((err) => {
    console.log(err);
  });
}

// exports.setAdmin = functions.https.onCall((data, context) => {
//   console.log(data);
// });

app.post("/api/setRole", async (req, res) => {
  //console.log("request arrived", req.body);
  //get id token passed
  const idToken = req.body.idToken;
  //verify id token and decode payload
  try {
    const claims = await admin.auth().verifyIdToken(idToken);
    //console.log(claims);

    //retrieve list of admins
    const isAdmin = await db
      .collection("admins")
      .where("email", "==", claims.email)
      .get();

    const isExecutive = await db
      .collection("executives")
      .where("email", "==", claims.email)
      .get();

    console.log(isAdmin.size, isExecutive.size);
    updateProfileRole(claims);

    //verify user is eligible as admin
    if (
      typeof claims.email !== "undefined" &&
      typeof claims.email_verified !== "undefined"
    ) {
      if (isAdmin.size > 0) {
        return admin
          .auth()
          .setCustomUserClaims(claims.sub, { role: "admin" })
          .then(() => {
            //tell client to refresh token
            return res.end(JSON.stringify({ status: "success" }));
          });
      } else if (isExecutive.size > 0) {
        return admin
          .auth()
          .setCustomUserClaims(claims.sub, { role: "executive" })
          .then(() => {
            //tell client to refresh token
            return res.end(JSON.stringify({ status: "success" }));
          });
      } else {
        return admin
          .auth()
          .setCustomUserClaims(claims.sub, { role: "guest" })
          .then(() => {
            //tell client to refresh token
            return res.end(JSON.stringify({ status: "success" }));
          });
      }
    } else {
      return admin
        .auth()
        .setCustomUserClaims(claims.sub, { role: "" })
        .then(() => {
          //tell client to refresh token
          return res.end(JSON.stringify({ status: "inEligible" }));
        });
    }

    //asign additional previledges
  } catch (err) {
    console.log(err);
    res.end(JSON.stringify({ status: "ineligible" }));
  }
});

exports.api = functions.https.onRequest(app);

exports.deleteExecutive = functions.firestore
  .document("executives/{executiveId}")
  .onDelete((snap, context) => {
    const executiveId = context.params.executiveId;

    return admin
      .auth()
      .deleteUser(executiveId)
      .then(() => {
        return aggregateExecutives();
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.createExecutive = functions.firestore
  .document("executives/{executiveId}")
  .onCreate((snap, context) => {
    const executiveId = context.params.executiveId;
    const created = snap.data();

    let disabled;
    if (created.isBlock === "blocked") {
      disabled = true;
    } else {
      disabled = false;
    }

    admin
      .auth()
      .createUser({
        uid: executiveId,
        displayName: created.displayName,
        email: created.email,
        password: created.password,
        photoURL: created.imageURL,
        disabled: disabled,
      })
      .then(() => {
        return aggregateExecutives();
      })
      .catch((err) => {
        console.log(err);
      });
  });

function aggregateExecutives() {
  return db
    .collection("executives")
    .get()
    .then((snapshot) => {
      return db.collection("adminDashboard").doc("executives").set(
        {
          executives: snapshot.size,
        },
        { merge: true }
      );
    });
}

exports.updateExecutive = functions.firestore
  .document("executives/{executiveId}")
  .onUpdate((change, context) => {
    const newValues = change.after.data();
    const executiveId = context.params.executiveId;

    let disabled;

    if (newValues.isBlock === "blocked") {
      disabled = true;
    } else {
      disabled = false;
    }

    return admin
      .auth()
      .updateUser(executiveId, {
        email: newValues.email,
        password: newValues.password,
        displayName: newValues.displayName,
        photoURL: newValues.imageURL,
        disabled: disabled,
      })
      .catch((error) => {
        // admin.auth().createUser({
        //   uid: executiveId,
        //   displayName: newValues.displayName,
        //   email: newValues.email,
        //   password: newValues.password,
        //   photoURL: newValues.imageURL,
        //   disabled: disabled,
        // });

        console.log(error);
      });
  });

//products aggregation
exports.products = functions.firestore
  .document("products/{productId}")
  .onWrite((change, context) => {
    db.collection("products")
      .get()
      .then((snap) => {
        return db
          .collection("adminDashboard")
          .doc("products")
          .set({ products: snap.size }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

//quiz aggregation
exports.singleQuiz = functions.firestore
  .document("singleQuiz/{quizId}")
  .onWrite((change) => {
    db.collection("singleQuiz")
      .get()
      .then((snap) => {
        return db
          .collection("adminDashboard")
          .doc("singleQuiz")
          .set({ singleQuiz: snap.size }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.groupQuiz = functions.firestore
  .document("groupQuiz/{quizId}")
  .onWrite((change) => {
    db.collection("groupQuiz")
      .get()
      .then((snap) => {
        return db
          .collection("adminDashboard")
          .doc("groupQuiz")
          .set({ groupQuiz: snap.size }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

//admin doctorsSummary
exports.adminDoctors = functions.firestore
  .document("executives/{executiveId}/dashboard/doctors")
  .onWrite((change, context) => {
    const executiveId = context.params.executiveId;

    return db
      .collectionGroup("doctors")
      .get()
      .then((snap) => {
        return db
          .collection("adminDashboard")
          .doc("doctors")
          .set({ doctors: snap.size }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

//admin daily lead summary
exports.adminLeads = functions.firestore
  .document("executives/{executiveId}/dailyLeads/{date}")
  .onWrite((change, context) => {
    const date = context.params.date;

    return db
      .collectionGroup("dailyLeads")
      .where("date", "==", date)
      .get()
      .then((snap) => {
        let leads = 0;
        snap.forEach((doc) => {
          const data = doc.data();
          leads += Number(data.leads);
        });

        return db
          .collection(`adminDailyLeads`)
          .doc(date)
          .set({ date: date, leads: leads, size: snap.size }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

//executive functions
//summary for doctors
exports.doctors = functions.firestore
  .document("executives/{executiveId}/doctors/{doctorId}")
  .onWrite((change, context) => {
    const executiveId = context.params.executiveId;

    return db
      .collection(`executives/${executiveId}/doctors`)
      .get()
      .then((snap) => {
        return db
          .collection(`executives/${executiveId}/dashboard`)
          .doc("doctors")
          .set({ doctors: snap.size }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  });

//daily leads sumarry
exports.executivesLeads = functions.firestore
  .document("executives/{executiveId}/leads/{leadId}")
  .onWrite(async (change, context) => {
    const executiveId = context.params.executiveId;

    const doc = change.after.exists
      ? change.after.data()
      : change.before.data();

    const date = doc.date;
    // console.log(executiveId);
    const executive = await db
      .collection("executives")
      .doc(executiveId)
      .get()
      .then((snap) => {
        // console.log(snap, snap.data());
        return snap.data();
      });
    //console.log(executive);
    const executiveName = `${executive.firstName} ${executive.lastName}`;

    return db
      .collection(`executives/${executiveId}/leads`)
      .where("date", "==", date)
      .get()
      .then((snap) => {
        let leads=0;
        snap.forEach(doc=>{
          const data=doc.data();

          leads+=Number(data.leads);
        })
        return db
          .collection(`executives/${executiveId}/dailyLeads/`)
          .doc(date)
          .set(
            {
              leadId: date,
              executiveName: executiveName,
              executiveId: executiveId,
              leads:leads,
              size: snap.size,
              date: date,
            },
            { merge: true }
          );
      })

      .catch((err) => {
        console.log(err);
      });
  });
