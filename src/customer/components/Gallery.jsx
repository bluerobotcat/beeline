import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import food1 from "../images/food1.jpg";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function Gallery() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="100%" height="auto" width="100vm">
        <ImageList cols={1} sx={{ width: "auto", height: "50vh" }}>
          <ImageListItem>
            <img src={food1} alt="food" loading="lazy" />
            <ImageListItemBar
              Width="100%"
              title="food"
              subtitle="food"
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>

          <ImageListItem>
            <img src={food1} alt="food" loading="lazy" />
            <ImageListItemBar
              Width="100%"
              title="food"
              subtitle="food"
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </ImageList>
      </Container>
    </React.Fragment>
  );
}
