import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Divider,
  Fab,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import "../App.css";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProduct,
  removeSelectedProduct,
} from "../app/productSlice";
import axios from "axios";

const ProductDetails = () => {
  const [flag, setFlag] = useState(false);
  const [isLog, setIsLog] = useState(false);
  const productId = useParams();
  console.log(productId.id);
  const dispatch = useDispatch();
  const select = useSelector((state) => state.products.product);
  const userEmail = sessionStorage.getItem("user");

  // const updateView = async (id, product) => {
  //   if (id === null) {
  //     return;
  //   }

  //   const updateProduct = {
  //     productId: product.productId,
  //     productName: product.productName,
  //     description: product.description,
  //     mfgBy: product.mfgBy,
  //     quantity: product.quantity,
  //     price: product.price,
  //     view: 0,
  //   };

  //   await axios
  //     .put(`http://localhost:7000/updateView/${id}`)
  //     .then((res) => console.log(res));
  // };

  const updateProductView = async () => {
    await axios
      .put(`http://localhost:7000/updateView/${productId.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteSelectedProduct = () => {
    if (userEmail !== null) {
      dispatch(deleteProduct(productId.id));
      console.log("Deleted... product");
      setFlag(true);
    } else {
      setIsLog(true);
    }
  };

  const onCloseClick = () => {
    window.location.href = "/products";
  };

  const handleClose = () => {
    setIsLog(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    dispatch(getProduct(productId.productId));
    console.log(select);

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [dispatch]);

  updateProductView();

  // updateView(productId, select);

  return (
    <>
      {flag ? (
        <Alert onClose={onCloseClick}>
          <AlertTitle> Product Deleted Succesfully.... </AlertTitle>
          {select.name} product is now deleted you can close it to view product
          list.
        </Alert>
      ) : (
        <Container>
          <Modal
            hideBackdrop
            open={isLog}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 500, height: 100 }}>
              <h2 id="child-modal-title">Log In Warning</h2>
              <p id="child-modal-description">
                You have to login first to delete product.
              </p>
              <Button sx={{ marginTop: 3 }} onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Modal>
          <Box sx={{ mx: "2px", transform: "scale(0.8)", marginTop: "90px" }}>
            <Paper elevation={2} sx={{ padding: "15px 18px" }}>
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>
                    <Link to="/products">
                      <KeyboardBackspaceIcon sx={{ fontSize: "30px" }} />
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    variant="h4"
                    sx={{ color: "rgba(21, 119, 175, 0.966)" }}
                  >
                    Product Details
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>ID</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography> {select.productId} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>Product Name</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography> {select.productName} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>Product Description</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography>{select.description}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>Product Manufacturer</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography>{select.mfgBy}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>Product Quantity</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography> {select.quantity} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>Product Price</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography> {select.price} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography>Last Updated By</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography> {select.lastUpdatedBy} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                spacing={2}
                sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
              >
                <Grid item xs={2}>
                  <Typography></Typography>
                </Grid>
                <Grid item xs={10}>
                  <Link
                    to={
                      userEmail !== null
                        ? `/editProduct/${select.productId}`
                        : "/login"
                    }
                    className="res-link"
                  >
                    <Fab
                      variant="extended"
                      color="primary"
                      sx={{ marginRight: "15px" }}
                    >
                      <EditIcon sx={{ margin: "0px 5px" }} />
                      Edit Product
                    </Fab>
                  </Link>
                  <Fab
                    variant="extended"
                    color="warning"
                    sx={{ background: red[600] }}
                    onClick={deleteSelectedProduct}
                  >
                    <DeleteIcon sx={{ margin: "0px 5px" }} />
                    Delete Product
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ProductDetails;
