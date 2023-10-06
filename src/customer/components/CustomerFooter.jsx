import { Grid, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function CustomerFooter() {
  const footerStyles = {
    root: {
      backgroundColor: "#000",
      color: "#fff",
      padding: "16px",
    },
    column: {
      display: "flex",
      flexDirection: "column",
    },
    link: {
      marginBottom: "8px",
    },
  };
  return (
    <div style={footerStyles.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} style={footerStyles.column}>
          <ListItemButton divider component={Link} to="/faq">
            <ListItemText primary="FAQ" sx={{ textAlign: "center" }} />
          </ListItemButton>
          <ListItemButton divider component={Link} to="/aboutus">
            <ListItemText primary="About Us" sx={{ textAlign: "center" }} />
          </ListItemButton>
          <ListItemButton divider component={Link} to="/contactus">
            <ListItemText primary="Contact Us" sx={{ textAlign: "center" }} />
          </ListItemButton>
          <ListItemButton divider component={Link} to="vendorsite">
            <ListItemText primary="Vendor Site" sx={{ textAlign: "center" }} />
          </ListItemButton>
        </Grid>
        <Grid item xs={12} sm={6} style={footerStyles.column}>
          <ListItemButton divider component={Link} to="/account">
            <ListItemText primary="ACCOUNT" sx={{ textAlign: "center" }} />
          </ListItemButton>
          <ListItemButton divider component={Link} to="/privacypolicy">
            <ListItemText
              primary="Privacy Policy"
              sx={{ textAlign: "center" }}
            />
          </ListItemButton>
          <ListItemButton divider component={Link} to="/termsconditions">
            <ListItemText
              primary="Terms & Conditions"
              sx={{ textAlign: "center" }}
            />
          </ListItemButton>
        </Grid>
      </Grid>
      <Grid align="center">
        {/* <Typography>
          Contact Us: Email: customersupport@foodsite.com | Phone:
          1-800-123-4567
        </Typography>
        <Typography>
          Order Tracking: Track your order | View order history
        </Typography>
        <Typography>
          Delivery Information: Delivery Areas | Delivery Times | Delivery
          Charges
        </Typography>
        <Typography>
          Payment Methods: We accept Visa, Mastercard, PayPal, and Cash on
          Delivery
        </Typography>
        <Typography>
          Customer Reviews: Read our customer reviews | Submit a review
        </Typography> */}
        <Typography
          variant="overline"
          align="center"
          sx={{ textAlign: "center", alignContent: "center" }}
        >
          COPYRIGHT BEELINE ALL RIGHTS RESERVED
        </Typography>
      </Grid>
    </div>
  );
}
