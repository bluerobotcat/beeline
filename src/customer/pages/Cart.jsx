import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Divider, Grid, List, ListItem } from "@mui/material";

export default function CartList() {
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
          My Cart
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Dish Summary</Typography>
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
