import React from "react";
import { Divider } from "@mui/material";
import Fooddisplay from "./Fooddisplay";
import MenuItem from "../components/MenuItem";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div>
      <MenuItem />
      <Divider />
      <MenuItem />
      <Divider />
      <MenuItem />
      <Fooddisplay /> {/* display food */}
      {/* <p>
        <Link to="/">Go to the home page</Link>
      </p> */}
    </div>
  );
}
