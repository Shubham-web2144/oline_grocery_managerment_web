import { Alert, Button, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getProduct,
} from "../app/productSlice";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const productId = useParams();
  const dispatch = useDispatch();
  const select = useSelector((state) => state.products.product);
  const [add, setAdd] = useState(false);
  const [productObj, setProductObj] = useState(select);

  let queryId = productId.id;
  const userEmail = sessionStorage.getItem('user');

  useEffect(() => {
    dispatch(getProduct(queryId));
    setProductObj(select);
  }, [dispatch, select]);

  const validate = (values) => {
    let error = {};
    if (!values.productName) {
      error.name = "Please enter product name";
    } else if (!values.price) {
      error.price = "Please enter product price";
    } else if (!values.quantity) {
      error.quantity = "Please enter product quantity";
    } else if (!values.mfgBy) {
      error.mfg = "Please enter mfg details";
    } else if (!values.description) {
      error.quantity = "Please enter product description";
    }
    return error;
  };

  const formik = useFormik({
    initialValues: {
      productName: productObj.productName,
      price: productObj.price,
      quantity: productObj.quantity,
      mfgBy: productObj.mfgBy,
      description: productObj.description,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      axios.put(`http://localhost:7000/updateProduct/${queryId}`, {
        productName: values.productName,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        mfgBy: values.mfgBy,
        view: productObj.view,
        lastUpdatedBy: userEmail
      }).then((res) => console.log(res));
      setAdd(true);
      resetForm(values);
    },
  });

  setTimeout(() => {
    setAdd(false);
  }, 50000);

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
          <Alert severity="success">Product updated succesfully....</Alert>
        ) : (
          <></>
        )}
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginTop: "20px", marginBottom: "10px" }}
        >
          Update Product Details
        </Typography>
        <form className="addProduct" onSubmit={formik.handleSubmit}>
          <div className="addProduct__inp">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              id="productName"
              onChange={formik.handleChange}
              value={formik.values.productName}
            />
            {formik.errors.productName ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.productName}
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
              name="mfgBy"
              id="mfgBy"
              onChange={formik.handleChange}
              value={formik.values.mfgBy}
            />
            {formik.errors.mfgBy ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.mfgBy}
              </Alert>
            ) : (
              <></>
            )}
          </div>
          <div className="addProduct__inp">
            <label>Product Description</label>
            <textarea
              name="description"
              id="description"
              rows="5"
              onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>
            {formik.errors.description ? (
              <Alert sx={{ marginTop: "6px" }} severity="error">
                {formik.errors.description}
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
            Update Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProduct;
