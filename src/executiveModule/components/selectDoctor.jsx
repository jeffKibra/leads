import { MenuItem, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import SimpleSelect from "../../components/simpleSelect";
import IsLoadedIsEmptyHOC from "../../HOCs/isLoadedIsEmptyHOC";

export default function SelectDoctor(props) {
  const { register, errors, setValue, doctorId } = props;

  const doctors = useSelector((state) => state.firestore.ordered.doctors);
  const auth = useSelector((state) => state.firebase.auth);

  useFirestoreConnect([
    {
      collection: "executives",
      doc: auth.uid,
      subcollections: [
        {
          collection: "doctors",
        },
      ],
      storeAs: "doctors",
    },
  ]);

  return (
    <SelectComponent
      register={register}
      errors={errors}
      setValue={setValue}
      data={doctors}
      doctorId={doctorId}
    />
  );
}

const SelectComponent = IsLoadedIsEmptyHOC((props) => {
  const { data, register, errors, setValue, doctorId } = props;

  return (
    <SimpleSelect
      name="doctor"
      label="Select doctor"
      register={register}
      errors={errors}
      setValue={setValue}
      defaultValue={doctorId || ""}
    >
      <MenuItem value="">
        <Typography variant="subtitle1">Select doctor</Typography>{" "}
      </MenuItem>
      {data.map((doctor) => {
        const { doctorId, firstName, lastName } = doctor;
        return (
          <MenuItem key={doctorId} value={doctorId}>
            {`${firstName} ${lastName}`}
          </MenuItem>
        );
      })}
    </SimpleSelect>
  );
});
