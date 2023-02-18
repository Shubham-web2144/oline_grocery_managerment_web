import { ImageList, ImageListItem, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../App.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FacebookIcon from '@mui/icons-material/Facebook';

const About = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state);

  let userId = sessionStorage.getItem("user");

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "100%", height: "20%", position: "relative" }}>
          <div className="img__text" >
            <h1>Online Grocery Products Management</h1>
            <p> Easy to mangae your all grocery products with our management system. Lets use it and make your work fast and easy. </p>
            <p>
            Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense.
It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals.
            </p>
          </div>
            <img className="img" src="https://png.pngtree.com/thumb_back/fh260/background/20220523/pngtree-person-adaptation-with-disability-image_1373919.jpg" />
        </Box>
      </Box>

      <Box sx={{ width: "100%", background: "black", color: "white", padding: "10px 12px" }}>
        <Typography variant="h5">Follow us :</Typography>
        <List   >
          <ListItem sx={{ alignItems: "center" }}>
          <InstagramIcon sx={{ margin: "0px 4px" }} />
            <Link className="l-1">
            Instagram
            </Link> 
          </ListItem>
          <ListItem sx={{ alignItems: "center" }}>
          <TwitterIcon sx={{ margin: "0px 4px" }} />
            <Link className="l-1">
            Twitter
            </Link> 
          </ListItem>
          <ListItem sx={{ alignItems: "center" }}>
          <AlternateEmailIcon sx={{ margin: "0px 4px" }} />
            <Link className="l-1">
            Gmail
            </Link> 
          </ListItem>
          <ListItem sx={{ alignItems: "center" }}>
          <FacebookIcon sx={{ margin: "0px 4px" }} />
            <Link className="l-1">
            Facebook
            </Link> 
          </ListItem>
          
        </List>
      </Box>
    </div>
  );
};

export default About;
