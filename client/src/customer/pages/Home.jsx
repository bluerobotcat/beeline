import React from "react";
import { Container, Divider } from "@mui/material";
import Gallery from "../components/Gallery";
import GalleryToo from "../components/GalleryToo";
import StoreNav from "./StoreNav";
import { Link } from "react-router-dom";
import Menu from "./Menu";

export default function Home() {
  return (
    <div>
      {/* <Gallery /> */}
      <GalleryToo />
      <Divider />
      <StoreNav />
      <Divider />
      <Menu />
      {/* <p>
        <Link to="/">Go to the home page</Link>
      </p> */}
    </div>
  );
}
