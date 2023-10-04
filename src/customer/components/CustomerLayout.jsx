import React, { useState } from "react";
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

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, leftOpen, rightOpen }) => ({
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
    marginRight: `-${drawerWidth}px`,
    ...(rightOpen && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "leftOpen" && prop !== "rightOpen",
})(({ theme, leftOpen, rightOpen }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(leftOpen &&
    !rightOpen && {
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
  const [rightOpen, setRightOpen] = useState(false);

  const handleLeftOpen = () => {
    setLeftOpen(true);
  };

  const handleLeftClose = () => {
    setLeftOpen(false);
  };

  const handleRightOpen = () => {
    setRightOpen(true);
  };

  const handleRightClose = () => {
    setRightOpen(false);
  };

  const icons = [
    <HomeIcon />,
    <MenuIcon />,
    <AssignmentIcon />,
    <ShoppingCartIcon />,
    <AccountCircleIcon />,
    <SettingsIcon />,
  ];

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" leftOpen={leftOpen} rightOpen={rightOpen}>
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
            <img
              style={{ height: "40px" }}
              src={BeeLineLogo}
              alt="Beeline logo"
            />
            <IconButton
              aria-label="cart"
              style={{ marginLeft: "auto" }}
              color="inherit"
              onClick={handleRightOpen}
            >
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
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
            {[
              { text: "Home", path: "/", iconIndex: 1 },
              { text: "Menu", path: "/menu", iconIndex: 2 },
              { text: "Cart", path: "/cart", iconIndex: 3 },
              { text: "Account", path: "/account", iconIndex: 4 },
              { text: "Settings", path: "/settings", iconIndex: 5 },
            ].map((item) => (
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
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="right"
          open={rightOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleRightClose}>
              {theme.direction === "ltr" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              "Setting 1",
              "Setting 2",
              "Setting 3",
              "Setting 4",
              "Setting 5",
            ].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icons[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}
