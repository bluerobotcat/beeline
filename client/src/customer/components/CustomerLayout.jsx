import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Badge,
  Drawer,
  CssBaseline,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
} from "@mui/icons-material";
import BeeLineLogo from "../images/beelinelogo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, Route, Routes } from "react-router-dom";
import Routing from "../../Routing";

import axios from "axios";

import { CUSTOMER_ID_GLOBAL } from "../../SessionID";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, leftOpen }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(leftOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, leftOpen, rightOpen }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(leftOpen && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//     marginRight: `-${drawerWidth}px`,
//     ...(rightOpen && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "leftOpen" && prop !== "rightOpen",
// })(({ theme, leftOpen, rightOpen }) => ({
//   transition: theme.transitions.create(["margin", "width"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),

//   ...(leftOpen &&
//     !rightOpen && {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: `${drawerWidth}px`,
//       transition: theme.transitions.create(["margin", "width"], {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
// }));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "leftOpen",
})(({ theme, leftOpen }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(leftOpen && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function CustomerLayout() {
  const theme = useTheme();
  const [leftOpen, setLeftOpen] = useState(false);
  // const [rightOpen, setRightOpen] = useState(false);
  const icons = [
    <HomeIcon />,
    <MenuIcon />,
    <AssignmentIcon />,
    <ShoppingCartIcon />,
    <AccountCircleIcon />,
    <SettingsIcon />,
  ];

  const handleLeftOpen = () => setLeftOpen(true);
  const handleLeftClose = () => setLeftOpen(false);
  // const handleRightOpen = () => setRightOpen(true);
  // const handleRightClose = () => setRightOpen(false);

  const menuItems = [
    { text: "Home", path: "/", iconIndex: 1 },
    { text: "Menu", path: "/menu", iconIndex: 2 },
    { text: "Cart", path: "/cart", iconIndex: 3 },
    { text: "Account", path: "/account", iconIndex: 4 },
    { text: "Settings", path: "/settings", iconIndex: 5 },
  ];

  // const [data, setData] = useState({ totalQty: 0 });
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8600/customer-order-count/${CUSTOMER_ID_GLOBAL}`)
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // });

  return (
    <div>
      <Box sx={{ display: "flex", overflowX: "hidden" }}>
        <CssBaseline />
        <AppBar position="fixed" leftOpen={leftOpen}>
          {/* <AppBar position="fixed" leftOpen={leftOpen} rightOpen={rightOpen}> */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open left drawer"
              onClick={handleLeftOpen}
              edge="start"
              sx={{ mr: 2, ...(leftOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Link to="/">
              <img
                style={{ height: "40px" }}
                src={BeeLineLogo}
                alt="Beeline logo"
              />
            </Link>
            <IconButton
              aria-label="cart"
              style={{ marginLeft: "auto" }}
              color="inherit"
              component={Link}
              to="/cart"
            >
              <ShoppingCartIcon />
              {/* <Badge badgeContent={data.totalQty} color="secondary">
               
  </Badge> */}
            </IconButton>
            <IconButton
              aria-label="login"
              color="inherit"
              component={Link}
              to="/account"
            >
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              maxWidth: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={leftOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleLeftClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemIcon>{icons[item.iconIndex]}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main open={leftOpen}>
          <DrawerHeader />
          <Routing />
        </Main>
        {/* Commented out the entire right drawer
      <Drawer sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" }}} variant="persistent" anchor="right" open={rightOpen}>
        <DrawerHeader>
          <IconButton onClick={handleRightClose}>
            {theme.direction === "ltr" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Setting 1", "Setting 2", "Setting 3", "Setting 4", "Setting 5"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      */}
      </Box>
    </div>
  );
}
