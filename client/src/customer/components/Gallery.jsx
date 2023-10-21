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
      <div style={{ width: "100%" }}>
        <ImageList cols={1} sx={{ width: "100%", height: "auto" }}>
          <ImageListItem sx={{ width: "100%" }}>
            <img
              src={food1}
              alt="food"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
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
            <img
              src={food1}
              alt="food"
              loading="lazy"
              style={{ width: "100%", height: "auto" }}
            />
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
      </div>
    </React.Fragment>
  );
}
