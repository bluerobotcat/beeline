import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CoverImage from "../images/coverimage.jpg";
import DeliciousFoodImage from "../images/delicious_food.jpg";
import SaveMoneyImage from "../images/save_money.jpg";
import QuickDeliveryImage from "../images/quick_delivery.jpg";
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

export default function CustomerLandingPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <StyledCoverImage src={CoverImage} alt="people enjoying food" />
        <Typography
          variant="h3"
          color="primary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Beeline: Your Ultimate Food Ordering Solution
        </Typography>

        <Typography variant="h5" sx={{ mb: 6, textAlign: "center" }}>
          Dive into a World of Culinary Delights with Beeline. Order Delicious
          Food, Save Money, and Enjoy Quick Deliveries!
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage src={DeliciousFoodImage} alt="Delicious Food" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Delicious Food
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Explore a diverse range of cuisines and dishes from local vendors.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage src={SaveMoneyImage} alt="Save Money" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Save Money
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Enjoy exclusive deals, discounts, and loyalty rewards.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage src={QuickDeliveryImage} alt="Quick Delivery" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2 }}
            >
              Quick Delivery
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Get your favorite meals delivered to your doorstep in no time.
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
              Sign up and create your customer account on Beeline.
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
              Browse through a variety of vendors and cuisines.
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
              Place your order and track it in real-time.
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
              Enjoy your meal and leave a review for the vendor!
            </Typography>
          </Grid>
        </Grid>
        <StyledTestimonialImage src={TestimonialImage} alt="Testimonial" />
        <Typography variant="body1" sx={{ textAlign: "center", my: 6 }}>
          <em>
            "Beeline has changed the way I order food. So many options, great
            deals, and super-fast delivery!"
          </em>
          <br />- Happy Customer
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/customersignup"
          color="primary"
          sx={{ mx: "auto", display: "block", textAlign: "center" }}
        >
          Start Ordering Now
        </Button>
      </Box>
    </Container>
  );
}
