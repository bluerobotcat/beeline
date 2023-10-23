import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Button, MobileStepper, Paper, Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import top1 from "../images/top1.JPG";
import top2 from "../images/top2.JPG";
import top3 from "../images/top3.JPG";
import top4 from "../images/top4.JPG";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNavigation = (direction) => {
    setActiveStep((prev) => prev + direction);
  };

  const handleStepChange = (step) => setActiveStep(step);

  const images = [
    {
      dishName: "Chicken Rice",
      storeName: "Chicken Rise",
      imgPath: top1,
    },
    {
      dishName: "Chicken Wings",
      storeName: "Muslim Delight",
      imgPath: top2,
    },
    {
      dishName: "Hokkien Prawn Mee",
      storeName: "Wok Fragrance",
      imgPath: top3,
    },
    {
      dishName: "Fish & Chips",
      storeName: "Western Grill",
      imgPath: top4,
    },
  ];
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
          width: "95%",
          height: "33.33vh",
          mb: 3,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      >
        <Box
          style={{
            height: "33.33vh",
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={5000}
          >
            {images.map((step, index) => (
              <div key={step.dishName}>
                {Math.abs(activeStep - index) <= 2 && (
                  <img
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      borderRadius: "10px",
                      transition: "transform .2s",
                    }}
                    src={step.imgPath}
                    alt={step.dishName}
                  />
                )}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <Paper
            square
            elevation={0}
            style={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              fontSize: "1em",
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
            }}
          >
            <Typography>
              {images[activeStep].dishName} from {images[activeStep].storeName}
            </Typography>
          </Paper>
        </Box>
        <MobileStepper
          steps={images.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                fontSize: "1em",
                padding: "8px 16px",
              }}
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
              size="medium"
              sx={{
                fontSize: "1em",
                padding: "8px 16px",
              }}
              onClick={() => handleNavigation(-1)}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
          sx={{
            backgroundColor: "rgba(0,0,0,0.7)",
          }}
        />
      </Box>
    </Box>
  );
}
