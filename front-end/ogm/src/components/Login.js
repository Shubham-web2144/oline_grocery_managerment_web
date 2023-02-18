import React, {  useState } from "react";
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
import { Link } from "react-router-dom";
import { useFormik } from "formik";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);

  const validate = ({ email, password }) => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required!!";
    } else if (!password) {
      errors.password = "Password is required!!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      await axios
        .post(
          `http://localhost:7000/login?email=${values.email}&password=${values.password}`
        )
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.setItem("user", values.email);
            window.location.href = "/about";
          } else {
            setErrorText(res.data);
            setIsError(true);
            console.log(isError, " => ", errorText);
          }
        })
        .catch((errr) => {
          setErrorText(errr.response.data);
          setIsError(true);
          console.log(errr);
        });
    },
  });

  return (
    <>
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
            height: "500px",
            display: "flex",
            flexDirection: "column",
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
          {isError ? <Alert severity="error" sx={{ textAlign: "center" }}>{errorText}</Alert> : <></>}
          <form className="loginForm" onSubmit={formik.handleSubmit}>
            <div className="form-field">
              <label>Username</label>
              <input
                className="form-field-input"
                type={"text"}
                name="email"
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <Alert severity="error">{formik.errors.email}</Alert>
              ) : (
                <></>
              )}
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                className="form-field-input"
                type={"password"}
                name="password"
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
              type="submit"
              variant="contained"
              color="success"
            >
              Log In
            </Button>
            <Divider>OR</Divider>
            <Button
              sx={{ width: "calc(100% - 400px)", margin: "8px 0px" }}
              variant="contained"
              color="warning"
            >
              <Link className="l-1" to="/create">
                Create an Account
              </Link>
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
