import { Alert, Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import "../App.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);

  const validate = (values) => {
    let error = {};
    if (!values.name) {
      error.name = "Please enter product name";
    } else if (!values.price) {
      error.price = "Please enter product price";
    } else if (!values.quantity) {
      error.quantity = "Please enter product quantity";
    } else if (!values.mfg) {
      error.mfg = "Please enter mfg details";
    } else if (!values.desc) {
      error.quantity = "Please enter product description";
    }
    return error;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      quantity: 0,
      mfg: "",
      desc: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
     await axios
        .post("http://localhost:7000/createProduct", {
          productName: values.name,
          description: values.desc,
          mfgBy: values.mfg,
          quantity: values.quantity,
          price: values.price,
          view: 0,
        })
        .then((res) => {
          if (res.status === 201) {
            setAdd(true);
          }
        });
      resetForm(values);
    },
  });

  setTimeout(() => {
    setAdd(false);
  }, 6000);

  return (
    <Container
      maxWidth="xl"
      component="div"
      sx={{
        background: "#f1f1f1",
        height: "100vh",
        display: "flex",
        paddingTop: "50px",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "calc(100% - 400px)",
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        {add ? (
          <Alert severity="success">Product added succesfully....</Alert>
        ) : (
          <></>
        )}
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginTop: "20px", marginBottom: "10px" }}
        >
          Add New Product
        </Typography>
        <form className="addProduct" onSubmit={formik.handleSubmit}>
          <div className="addProduct__inp">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.name}
              </Alert>
            ) : (
              <></>
            )}
          </div>
          <div className="addProduct__inp">
            <label>Product Price</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.errors.price ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.price}
              </Alert>
            ) : (
              <></>
            )}
          </div>
          <div className="addProduct__inp">
            <label>Product Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              onChange={formik.handleChange}
              value={formik.values.quantity}
            />
            {formik.errors.quantity ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.quantity}
              </Alert>
            ) : (
              <></>
            )}
          </div>
          <div className="addProduct__inp">
            <label>Product Manufacturer</label>
            <input
              type="text"
              name="mfg"
              id="mfg"
              onChange={formik.handleChange}
              value={formik.values.mfg}
            />
            {formik.errors.mfg ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.mfg}
              </Alert>
            ) : (
              <></>
            )}
          </div>
          <div className="addProduct__inp">
            <label>Product Description</label>
            <textarea
              name="desc"
              id="desc"
              rows="5"
              onChange={formik.handleChange}
              value={formik.values.desc}
            ></textarea>
            {formik.errors.desc ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.desc}
              </Alert>
            ) : (
              <></>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              margin: "14px 0px",
              width: "calc(100% - 50px)",
              marginLeft: "23px !important",
            }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
