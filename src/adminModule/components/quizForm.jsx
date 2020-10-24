import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Grid,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { isLoaded, isEmpty, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import TextInput from "../../components/textInput";
import DateInput from "../../components/dateInput";
import SimpleSelect from "../../components/simpleSelect";
import CustomSkeleton from "../../components/customSkeleton";

const useStyles = makeStyles((theme) => {
  return {
    Card: {
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
  };
});

export default function QuizForm(props) {
  console.log(props);
  const {
    quizTitle,
    quizDescription,
    status,
    date,
    title,
    product,
    category,
    onFormSubmit,
  } = props;

  const { register, errors, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      quizTitle: quizTitle || "",
      quizDescription: quizDescription || "",
      status: status || "",
      date: date,
      product: product || "",
      category: category || "",
    },
  });

  useEffect(() => {
    if (quizTitle) {
      reset({
        quizTitle: quizTitle || "",
        quizDescription: quizDescription || "",
        status: status || "",
        date: date,
        product: product || "",
        category: category || "",
      });
    }
  }, [
    quizTitle,
    quizDescription,
    status,
    date,
    title,
    product,
    category,
    reset,
  ]);

  useFirestoreConnect([
    {
      collection: "products",
    },
  ]);

  const products = useSelector((state) => state.firestore.ordered.products);
  const productsObject = useSelector((state) => state.firestore.data.products);
  const classes = useStyles();

  if (!isLoaded(products)) return <CustomSkeleton />;

  const onSubmit = (data, e) => {
    e.target.reset();
    const productObject = productsObject[data.product];
    const { productName, imageURL } = productObject;

    const newData = {
      ...data,
      productName: productName,
      imageURL: imageURL || "",
    };
    //console.log(newData)
    onFormSubmit(newData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6} container justify="center">
          <Card>
            <CardHeader title={title} />
            <CardContent>
              <Grid container justify="space-between" spacing={3}>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <SimpleSelect
                    register={register}
                    errors={errors}
                    defaultValue={product || ""}
                    name="product"
                    label="Select Product"
                    setValue={setValue}
                  >
                    <MenuItem value="">
                      <Typography variant="subtitle1">
                        Select Product
                      </Typography>
                    </MenuItem>
                    {isEmpty(products) ? (
                      <MenuItem value="">
                        Please add a product from the products page!
                      </MenuItem>
                    ) : (
                      products.map((product, index) => {
                        const { productId, productName } = product;
                        return (
                          <MenuItem key={index} value={productId}>
                            {productName}
                          </MenuItem>
                        );
                      })
                    )}
                  </SimpleSelect>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <SimpleSelect
                    register={register}
                    errors={errors}
                    defaultValue={category || ""}
                    name="category"
                    label="Select Category"
                    setValue={setValue}
                  >
                    <MenuItem value="">
                      <Typography variant="subtitle1">
                        Select Category
                      </Typography>
                    </MenuItem>

                    <MenuItem value="singleQuiz">Single Quiz</MenuItem>
                    <MenuItem value="groupQuiz">Group Quiz</MenuItem>
                  </SimpleSelect>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <TextInput
                    register={register}
                    errors={errors}
                    defaultValue={quizTitle}
                    label="Quiz Title"
                    name="quizTitle"
                    required={{ value: true, message: "field cannot be empty" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <TextInput
                    register={register}
                    errors={errors}
                    defaultValue={quizDescription}
                    label="Quiz Description"
                    name="quizDescription"
                    required={{ value: true, message: "field cannot be empty" }}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <DateInput
                    register={register}
                    errors={errors}
                    defaultValue={date}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  direction="column"
                  justify="center"
                >
                  <SimpleSelect
                    register={register}
                    errors={errors}
                    defaultValue={status || ""}
                    name="status"
                    label="Quiz Status"
                    setValue={setValue}
                  >
                    <MenuItem value="">
                      <em>Select Status</em>
                    </MenuItem>
                    <MenuItem value="pending">pending</MenuItem>
                    <MenuItem value="done">done</MenuItem>
                  </SimpleSelect>
                </Grid>
              </Grid>
              <Button type="submit" className={classes.button}>
                save
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

QuizForm.propTypes = {
  title: PropTypes.string.isRequired,
  // register: PropTypes.func.isRequired,
  // errors: PropTypes.object.isRequired,
  // setValue: PropTypes.func.isRequired,
  quizTitle: PropTypes.string,
  quizDescription: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
};
