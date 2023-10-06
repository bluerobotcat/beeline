import { Grid, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function VendorFooter() {
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
          <ListItemButton divider component={Link} to="/information">
            <ListItemText primary="INFORMATION" sx={{ textAlign: "center" }} />
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
          Vendor Support: Email: vendorsupport@foodsite.com | Phone:
          1-800-987-6543
        </Typography>
        <Typography>
          Vendor Dashboard: Access your vendor dashboard | Manage menus and
          orders
        </Typography>
        <Typography>
          Vendor Policies: Commission Rates | Delivery Guidelines | Vendor Terms
          of Service
        </Typography>
        <Typography>
          Vendor Onboarding: Become a vendor | Apply to join our platform
        </Typography>
        <Typography>
          Marketing Opportunities: Boost your business with featured listings |
          Advertise with us
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
