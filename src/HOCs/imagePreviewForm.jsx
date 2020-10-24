import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ImagePreviewForm(WrappedComponent) {
  return function HOC(props) {
    const { register, errors, setValue, handleSubmit } = useForm({
      mode: "onChange",
    });

    const { imageRequired, onFormSubmit } = props;
    const [src, setSrc] = useState("");
    const fileName = "image";

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setValue(fileName, file);
      const reader = new FileReader();
      reader.onload = function (e) {
        //console.log("file content", e.target.result);
        setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    };

    const handleFormSubmit = (data, e) => {
      e.target.reset();
      setSrc("");
      console.log(data);
      onFormSubmit(data);
    };

    useEffect(() => {
      register(fileName, { required: imageRequired });
    }, [register, imageRequired, fileName]);

    return (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <WrappedComponent
          fileName={fileName}
          src={src}
          {...props}
          handleFileChange={handleFileChange}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      </form>
    );
  };
}
