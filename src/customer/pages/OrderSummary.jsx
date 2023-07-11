import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export default function Receipt() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Order Placed
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="subtitle">
            You will be notified when your food is ready.
          </Typography>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Queue Number:</Typography>
          <Typography variant="subtitle">B0333</Typography>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Waiting Time:</Typography>
          <Typography variant="subtitle">10 minutes</Typography>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Receipt</Typography>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "left",
          }}
        >
          <Typography variant="h6" display="block">
            Store A
          </Typography>
          <Typography variant="subtitle" display="block">
            21 Mar 2023
          </Typography>
          <Typography variant="subtitle" display="block">
            Transaction No.: B210320230333
          </Typography>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "left",
          }}
        >
          <Typography variant="h6" display="block">
            Order Summary
          </Typography>
        </List>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="subtitle1">Dish A * 1</Typography>
              <Typography variant="subtitle1" align="right">
                $10.00
              </Typography>
            </Grid>
          </ListItem>
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="subtitle1">Dish B * 1</Typography>
              <Typography variant="subtitle1" align="right">
                $10.00
              </Typography>
            </Grid>
          </ListItem>
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="subtitle1">Dish C * 1</Typography>
              <Typography variant="subtitle1" align="right">
                $10.00
              </Typography>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="subtitle1">Subtotal</Typography>
              <Typography variant="subtitle1" align="right">
                $10.00
              </Typography>
            </Grid>
          </ListItem>
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="subtitle1">Service Fees</Typography>
              <Typography variant="subtitle1" align="right">
                $2.00
              </Typography>
            </Grid>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" align="right">
                $12.00
              </Typography>
            </Grid>
          </ListItem>
          <ListItem alignItems="flex-start">
            <Grid item container justifyContent="space-between">
              <Typography variant="subtitle1">Payment Mode</Typography>
              <Typography variant="subtitle1" align="right">
                VISA
              </Typography>
            </Grid>
          </ListItem>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="body" display="block">
            Thank you for dining with us!
          </Typography>
          <Typography variant="body" display="block">
            We hope to see you soon!
          </Typography>
        </List>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Check Out
        </Button>
      </Box>
    </Container>
  );
}
