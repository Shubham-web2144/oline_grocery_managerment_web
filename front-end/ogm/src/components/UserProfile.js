import { Label } from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const UserProfile = () => {
  const [user, setUser] = useState({});
  let userEmail = sessionStorage.getItem("user");

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };

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

  console.log(user);

  return (
    <Container
      sx={{
        padding: "20px 0px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: "400px",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Box sx={{ textAlign: "", marginBottom: "10px" }}>
          <Typography variant="h5">User Details</Typography>
        </Box>
        <Divider />
        <Box sx={{ marginTop: "13px" }}>
          <Grid
            container
            spacing={2}
            sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
          >
            <Grid item xs={2}>
              <Typography>Full Name</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography>
                { user.name }
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
              <Typography>Email Id</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography> {user.email} </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            spacing={2}
            sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
          >
            <Grid item xs={2}>
              <Typography>Mobile No</Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography> {user.mobile} </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            spacing={2}
            sx={{ fontFamily: "sans-serif", padding: "12px 8px" }}
          >
            <Grid item xs={10}>
              <Link to="/user/edit" className="res-link">
                <Fab
                  variant="extended"
                  color="primary"
                  sx={{ marginRight: "15px" }}
                >
                  <EditIcon sx={{ margin: "0px 5px" }} />
                  Edit Details
                </Fab>
              </Link>
              <Fab
                variant="extended"
                color="warning"
                sx={{ background: "red" }}
                onClick={handleLogOut}
              >
                <LogoutIcon sx={{ margin: "0px 5px" }} />
                Log out
              </Fab>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserProfile;
