import React from "react";
import { Grid, ListItemButton, ListItemText, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "react-router-dom";

export default function CustomerFooter() {
  const footerStyles = {
    root: {
      backgroundColor: "#000", // Updated background color
      color: "#fff",
      padding: "24px 16px", // Adjusted padding
      textAlign: "center",
    },
    column: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    contactInfo: {
      display: "flex",
      alignItems: "center",
      margin: "8px 0",
    },
    socialIcons: {
      fontSize: 24, // Increased icon size
      color: "#fff",
      margin: "0 12px", // Adjusted margin
    },
    copyright: {
      marginTop: "16px", // Adjusted margin
    },
  };

  return (
    <div style={footerStyles.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} style={footerStyles.column}>
          <ListItemButton divider component={Link} to="/aboutus">
            <ListItemText primary="About Us" />
          </ListItemButton>
          <ListItemButton divider component={Link} to="/account">
            <ListItemText primary="Account" />
          </ListItemButton>
          <div style={footerStyles.contactInfo}>
            <MailOutlineIcon />
            <Typography variant="overline" sx={{ marginLeft: 1 }}>
              customersupport@beeline.com
            </Typography>
          </div>
          <div style={footerStyles.contactInfo}>
            <PhoneIcon />
            <Typography variant="overline" sx={{ marginLeft: 1 }}>
              +65 6123 4567
            </Typography>
          </div>
          <Typography variant="overline" sx={footerStyles.copyright}>
            &copy; 2023 BEELINE ALL RIGHTS RESERVED
          </Typography>
          {/* <Typography variant="caption">
            Follow us on{" "}
            <Link to="/">
              <InstagramIcon sx={footerStyles.socialIcons} />
            </Link>{" "}
            and{" "}
            <Link to="/">
              <FacebookIcon sx={footerStyles.socialIcons} />
            </Link>
          </Typography> */}
        </Grid>
      </Grid>
    </div>
  );
}
