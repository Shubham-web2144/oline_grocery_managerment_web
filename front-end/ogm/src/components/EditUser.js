import { Button, Paper, Typography, Alert } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

const EditUser = () => {
  const [user, setUser] = useState({});
  let userEmail = sessionStorage.getItem("user");

  const getUser = (email) => {
    axios.get("http://localhost:7000/user").then((res) => {
      res.data.forEach((user) => {
        if (user.email === email) {
          setUser(user);
          return;
        }
      });
    });
  };

  useEffect(() => {
    getUser(userEmail);
  }, []);

  const validate = ({ name, email, mobile, newpassword }) => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required!!!";
    } else if (!email) {
      errors.email = "Email is required!!";
    } else if (!mobile) {
      errors.mobile = "Mobile number is required!!!";
    } else if (!newpassword) {
      errors.newpassword = "Password is required!!!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      newpassword: "",
    },
    validate,
    onSubmit: (values) => {
      axios
        .put(`http://localhost:7000/updateUserData/${user.userID}`, {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          password: values.newpassword,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            sessionStorage.setItem("user", values.email);
            window.location.href = "/user";
          }
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
            <Typography
              variant="h5"
              sx={{
                marginTop: "10px",
                fontWeight: "550",
                color: "#1976d2f6",
                fontFamily: "",
              }}
            >
              Edit Your Details
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
                <Alert severity="error">{ formik.errors.name }</Alert>
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
              <label>New Password</label>
              <input
                className="form-field-input"
                name="newpassword"
                type={"password"}
                value={formik.values.newpassword}
                onChange={formik.handleChange}
              />
              {formik.errors.newpassword ? (
                <Alert severity="error">{formik.errors.newpassword}</Alert>
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
              Update Details
            </Button>
            {/* <Button
                  sx={{ width: "calc(100% - 400px)", margin: "8px 0px" }}
                  variant="contained"
                  color="warning"
                >
                  <Link className="l-1" to="/login">
                    Log In
                  </Link>
                </Button> */}
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default EditUser;
