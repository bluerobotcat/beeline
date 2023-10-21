import React, { useEffect, useState } from "react";
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
  Tooltip,
} from "@mui/material";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Receipt(props) {
  const location = useLocation();
  const str = location.pathname;
  const pathOrderId = str.slice(str.lastIndexOf("/") + 1);

  // fetch cart items from API
  const [data, setData] = useState({
    orderId: 0,
    orderDate: "",
    orderTime: "",
    orderType: "",
    paymentType: "",
    orderTotal: 0.0,
    orderItems: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartTotal = data.orderTotal;
  const serviceFees = 0.1 * cartTotal;
  const total = cartTotal + serviceFees;

  useEffect(() => {
    axios
      .get(`http://localhost:8600/receipt/${pathOrderId}`)
      .then((response) => {
        setData(response.data);
        // console.log("cart data is:", response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [pathOrderId]);

  const [waitingTime, setWaitingTime] = React.useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (waitingTime > 0) {
        setWaitingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [waitingTime]);

  if (loading) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography>Loading order details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography color="error">
          Error fetching order details: {error.message}
        </Typography>
      </Container>
    );
  }

  console.log(data);

  return (
    <Container component="main" maxWidth="xs">
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

        {loading && <Typography>Loading order details...</Typography>}
        {error && (
          <Typography color="error">
            Error fetching order details: {error.message}
          </Typography>
        )}

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
          <Typography variant="subtitle">
            {("0000" + data.orderId).slice(-4)}
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
          {Math.abs(waitingTime) > 1e-5 ? (
            <>
              <Typography variant="h6">Waiting Time:</Typography>
              <Typography variant="subtitle" color="red">
                {waitingTime} seconds
              </Typography>
            </>
          ) : (
            <Typography variant="h6" color="green">
              Order is ready
            </Typography>
          )}
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
          <Typography variant="subtitle" display="block">
            Transaction Date: {data.orderDate}
          </Typography>
          <Typography variant="subtitle" display="block">
            Transaction Time: {data.orderTime}
          </Typography>
          <Typography variant="subtitle" display="block">
            Transaction No.: {("0000" + data.orderId).slice(-4)}
          </Typography>
          <Typography sx={{ mt: 2 }} variant="subtitle" display="block">
            Order Type: {data.orderType}
          </Typography>
          <Typography variant="subtitle" display="block">
            Payment Mode: {data.paymentType}
          </Typography>
        </List>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            mt: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              py: 1,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Order Summary
          </Typography>
          {data.orderItems.map((dish, index) => (
            <ListItem
              alignItems="flex-start"
              key={index}
              sx={{ py: 1.5, borderBottom: "1px solid #f5f5f5" }}
            >
              <Grid container justifyContent="space-between">
                {/* Dish Name and Quantity */}
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {dish.dishName}
                  </Typography>
                  {/*<Typography variant="body2" color="textSecondary">
                    Quantity: {dish.orderItemQty}
                  </Typography>
          */}
                  <Typography variant="body2" color="textSecondary">
                    {dish.orderModifier}
                  </Typography>
                </Grid>

                {/* Price */}
                <Grid item xs={6}>
                  <Typography variant="body1" align="right">
                    {dish.orderItemQty} x $
                    {(dish.dishPrice + dish.orderSurcharge || 0).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>

        <ListItem alignItems="flex-start" sx={{ pt: 1.5, pb: 0 }}>
          <Grid container justifyContent="space-between">
            {/* Service Fees Label */}
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Subtotal
              </Typography>
            </Grid>

            {/* Service Fees Amount */}
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                ${cartTotal.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem
          alignItems="flex-start"
          sx={{ pb: 1.5, pt: 0.5, borderBottom: "1px solid #f5f5f5" }}
        >
          <Grid container justifyContent="space-between">
            {/* Service Fees Label */}
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Service Fees
              </Typography>
            </Grid>

            {/* Service Fees Amount */}
            <Grid item xs={6}>
              <Typography variant="body1" align="right">
                ${serviceFees.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <ListItem
          alignItems="flex-start"
          sx={{ py: 1.5, borderBottom: "1px solid #f5f5f5" }}
        >
          <Grid container justifyContent="space-between">
            {/* Total Label */}
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Total
              </Typography>
            </Grid>

            {/* Total Amount */}
            <Grid item xs={6}>
              <Typography variant="h6" align="right">
                ${total.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        {/* <ListItem alignItems="flex-start">
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
          </ListItem> */}

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" display="block">
            Thank you for dining with us!
          </Typography>
          <Typography variant="body1" display="block">
            We hope to see you soon!
          </Typography>
        </List>
      </Box>
      <Box sx={{ mt: 4, textAlign: "center", minWidth: 300 }}>
        <Tooltip title="Add more dishes to your cart">
          <Button
            component={Link}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingCartIcon />}
            to="/"
            sx={{ mr: 2 }}
          >
            Start new order
          </Button>
        </Tooltip>
      </Box>
    </Container>
  );
}
