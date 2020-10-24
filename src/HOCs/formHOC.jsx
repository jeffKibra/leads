import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function FormHOC(WrappedComponent) {
  return function HOC(props) {
    const { defaultValues } = props;
    //console.log(props);
    const {
      register,
      errors,
      handleSubmit,
      watch,
      setValue,
      getValues,
      triggerValidation,
      control,
      reset,
    } = useForm({
      mode: "onChange",
      defaultValues: {
        ...defaultValues,
      },
    });

    useEffect(() => {
      reset({
        ...defaultValues,
      });
    }, [defaultValues, reset]);

    const onFormSubmit = (data, e) => {
      e.target.reset();
      props.onFormSubmit(data);
    };

    return (
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <WrappedComponent
          {...props}
          register={register}
          setValue={setValue}
          watch={watch}
          control={control}
          errors={errors}
          getValues={getValues}
          triggerValidation={triggerValidation}
        />
      </form>
    );
  };
}

export default FormHOC;
