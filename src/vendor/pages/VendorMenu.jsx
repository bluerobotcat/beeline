import Container from "@mui/material/Container";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Menu from "../../customer/pages/Menu"; // Update the path to your actual file path

export default function VendorMenu() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography
          variant="h3"
          color="primary"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          MENU MANAGEMENT
        </Typography>
        <Box mt={6} mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/vendoraddnewdish"
                color="secondary"
                fullWidth
              >
                <Typography variant="h6" fontWeight="bold">
                  Add New Dish
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/vendoreditdish"
                color="secondary"
                fullWidth
              >
                <Typography variant="h6" fontWeight="bold">
                  Edit Existing Dish
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/vendorremovedish"
                color="secondary"
                fullWidth
              >
                <Typography variant="h6" fontWeight="bold">
                  Remove Dish
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Menu />
        </Box>
      </Box>
    </Container>
  );
}
