import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const CreateAccount = () => {
  const validate = ({ name, email, mobile, password }) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required!!";
    } else if (!email) {
      errors.email = "Email is required";
    } else if (!mobile) {
      errors.mobile = "Mobile number is required!!";
    } else if (!password) {
      errors.password = "Password is required!!!";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: 0,
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      await axios
        .post("http://localhost:7000/createUser", values)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            sessionStorage.setItem("user", values.email);
            window.location.href = "/about";
          }
        })
        .catch((err) => console.warn(err));
    },
  });

  return (
    <>
      <Container
        maxWidth="xl"
        component="div"
        sx={{
          background: "#f1f1f1",
          minHeight: "100vh",
          display: "flex",
          paddingTop: "50px",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "calc(100% - 400px)",
            minHeight: "500px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
            paddingBottom: "40px",
          }}
        >
          <Box
            sx={{
              height: "180px",
              alignItems: "center",
              background: "",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{ background: "#1976d2", width: "90px", height: "90px" }}
            >
              <LockOpenIcon fontSize="large" sx={{ fontWeight: "800" }} />
            </Avatar>
            <Typography
              variant="h5"
              sx={{
                marginTop: "20px",
                fontWeight: "550",
                color: "#1976d2f6",
                fontFamily: "",
              }}
            >
              Sign In to Product Inventory Application
            </Typography>
          </Box>
          <form className="loginForm" onSubmit={formik.handleSubmit}>
            {/* <div className="form-field-box">
              <div className="form-field-box-input">
                <label>First Name</label>
                <input
                  className="form-field-input"
                  name="firstName"
                  type={"text"}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                
              </div>
              <div className="form-field-box-input">
                <label>Last Name</label>
                <input
                  className="form-field-input"
                  name="lastName"
                  type={"text"}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                
              </div>
            </div> */}
            <div className="form-field">
              <label>Full Name</label>
              <input
                className="form-field-input"
                name="name"
                type={"text"}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                  <Alert severity="error">{formik.errors.name}</Alert>
                ) : (
                  <></>
                )}
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                className="form-field-input"
                name="email"
                type={"email"}
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                  <Alert severity="error">{formik.errors.email}</Alert>
                ) : (
                  <></>
                )}
            </div>
            <div className="form-field">
              <label>Mobile No</label>
              <input
                className="form-field-input"
                name="mobile"
                type={"number"}
                value={formik.values.mobile}
                onChange={formik.handleChange}
              />
              {formik.errors.mobile ? (
                  <Alert severity="error">{formik.errors.mobile}</Alert>
                ) : (
                  <></>
                )}
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                className="form-field-input"
                name="password"
                type={"password"}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                  <Alert severity="error">{formik.errors.password}</Alert>
                ) : (
                  <></>
                )}
            </div>
            <Button
              sx={{ width: "calc(100% - 400px)", margin: "8px 0px" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Create an Account
            </Button>
            <Divider>OR</Divider>
            <Button
              sx={{ width: "calc(100% - 400px)", margin: "8px 0px" }}
              variant="contained"
              color="warning"
            >
              <Link className="l-1" to="/login">
                Log In
              </Link>
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default CreateAccount;
