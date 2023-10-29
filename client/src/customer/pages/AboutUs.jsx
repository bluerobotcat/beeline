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
import PhoneBeeline from "../images/phone_beeline.png";

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
export default function AboutUs() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          color="secondary"
          sx={{ mt: 0, mb: 0, textAlign: "center" }}
        >
          About Beeline:
        </Typography>
        <Typography
          variant="h4"
          color="primary"
          sx={{ mt: 0, mb: 4, textAlign: "center" }}
        >
          Your Zero-Waste Shortcut to Delicious Food
        </Typography>

        <Typography variant="h6" sx={{ mb: 6, textAlign: "center" }}>
          Revolutionizing food orders with customization to drastically reduce
          wastage and provide a unique dining experience.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage src={PhoneBeeline} alt="Customized Food" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Customized Food
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage src={TestimonialImage} alt="Delicious Food" />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Satisfied Cravings
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <StyledBenefitImage
              src={QuickDeliveryImage}
              alt="Unique Experience"
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="primary"
              sx={{ mb: 2, textAlign: "center" }}
            >
              Unique Experience
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
          <em>
            "Beeline lets me enjoy meals tailored for me while reducing food
            wastage. A win-win!"
          </em>
          <br />- Satisfied Diner
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/menu"
          color="primary"
          sx={{ mx: "auto", display: "block", textAlign: "center" }}
        >
          Discover Beeline
        </Button>
      </Box>
    </Container>
  );
}
