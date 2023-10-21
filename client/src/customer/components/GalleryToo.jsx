import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Delicious Pasta Carbonara",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Crispy Fried Chicken",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Refreshing Fruit Salad",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Creamy Vanilla Ice Cream",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];
export default function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNavigation = (direction) => {
    setActiveStep((prev) => prev + direction);
  };

  const handleStepChange = (step) => setActiveStep(step);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        mt: 0,
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "90%", lg: "100%" },
          height: { xs: "35vh", sm: "33vh", md: "31vh", lg: "29vh" },
          mb: 3,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      >
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 && (
                <Box
                  component="img"
                  sx={{
                    height: "80%",
                    objectFit: "cover",
                    width: "100%",
                    borderRadius: "10px 10px 0 0",
                    transition: "transform .2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              )}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            fontSize: "1.2em",
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
        <MobileStepper
          steps={images.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleNavigation(1)}
              disabled={activeStep === images.length - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleNavigation(-1)}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
          sx={{
            backgroundColor: "rgba(0,0,0,0.7)",
            "& .MuiButton-sizeSmall": {
              fontSize: "1em",
              color: theme.palette.common.white,
            },
          }}
        />
      </Box>
    </Box>
  );
}
