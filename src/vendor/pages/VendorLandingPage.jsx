import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CoverImage from "../images/coverimage.jpg";
import IncreaseEfficiencyImage from "../images/increase_efficiency.jpg";
import ReduceFoodWasteImage from "../images/reduce_food_waste.jpg";
import ExpandYourReachImage from "../images/expand_your_reach.jpg";
import Step1Image from "../images/step1.jpg";
import Step2Image from "../images/step2.jpg";
import Step3Image from "../images/step3.jpg";
import Step4Image from "../images/step4.jpg";
import TestimonialImage from "../images/testimonial.jpg";

const StyledCoverImage = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "4px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
});

const StyledBenefitImage = styled("img")({
  width: "100%",
  height: "180px",
  objectFit: "cover",
  marginBottom: "16px",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledStepImage = styled("img")({
  width: "100%",
  height: "180px",
  objectFit: "cover",
  marginBottom: "16px",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledTestimonialImage = styled("img")({
  width: "100%",
  height: "180px",
  objectFit: "cover",
  marginBottom: "16px",
  borderRadius: "4px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
});

export default function VendorLandingPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <StyledCoverImage src={CoverImage} alt="happy eating family" />
        <Typography
          variant="h3"
          color="primary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Beeline: Your Ultimate Vendor Solution
        </Typography>

        <Typography variant="h5" sx={{ mb: 6, textAlign: "center" }}>
          Streamline Your Business with Beeline's Innovative Food Ordering and
          Inventory Management Platform - An Integrated Solution for Zero-Waste
          Strategies and Efficient Food Service
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage
              src={IncreaseEfficiencyImage}
              alt="Increase Efficiency"
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Increase Efficiency
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Simplify your food ordering process and manage your inventory
              effectively with our user-friendly platform.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage
              src={ReduceFoodWasteImage}
              alt="Reduce Food Waste"
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Reduce Food Waste
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Monitor your inventory in real-time, track expiry dates, and
              optimize your supply chain to minimize food waste.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage
              src={ExpandYourReachImage}
              alt="Expand Your Reach"
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Expand Your Reach
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Join our network of hungry customers and get more exposure for
              your business. Reach new customers and increase your sales.
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <StyledStepImage src={Step1Image} alt="Step 1" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Step 1
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Sign up and create your vendor account on Beeline.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledStepImage src={Step2Image} alt="Step 2" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Step 2
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Add your menu items and customize your offerings to attract
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledStepImage src={Step3Image} alt="Step 3" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Step 3
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Receive orders directly from customers through our intuitive
              ordering system.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledStepImage src={Step4Image} alt="Step 4" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Step 4
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Manage your inventory, track stock levels, and receive alerts for
              low supplies.
            </Typography>
          </Grid>
        </Grid>
        <StyledTestimonialImage src={TestimonialImage} alt="Testimonial" />
        <Typography variant="body1" sx={{ textAlign: "center", my: 6 }}>
          <em>
            "Using Beeline has transformed my business. It's so easy to manage
            orders and inventory, and I've seen a significant reduction in food
            waste."
          </em>
          <br />- Young Bee
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/vendorsignup"
          color="primary"
          sx={{ mx: "auto", display: "block", textAlign: "center" }}
        >
          Try It Now
        </Button>
      </Box>
    </Container>
  );
}
