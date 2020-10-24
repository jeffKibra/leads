import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";

export default function AdminProtected({ children }) {
  const [role, setRole] = useState("");

  const firebase = useFirebase();
  const claims = firebase.auth()?.currentUser?.getIdTokenResult();

  useEffect(() => {
    if (claims) {
      claims
        .then((idTokenResult) => {
          setRole(idTokenResult.claims.role);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRole("");
    }
  }, [claims]);

  console.log(claims);

  return <>{role === "admin" && children}</>;
}
