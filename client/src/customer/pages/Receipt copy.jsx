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

import { useLocation } from "react-router-dom";
export default function Receipt(props) {
  const location = useLocation();
  const cartData = location.state?.cartData || [];
  const storeInfo = props.storeInfo || {
    storeId: "A001",
    storeName: "Store A",
    paymentMode: "VISA",
  }; // Mock default values.

  // The order ID should ideally be fetched from your backend or some state manageconst orderid = props.orderId || "0001";
  const orderId = props.orderId || "0001"; // Placeholder in case not provided.

  const initialQueueAndTransactionNumbers = () => {
    const queueNo = `Q${orderId}`;
    const transactionNo = `${storeInfo.storeId}${orderId}`;

    return { transactionNo, queueNo };
  };

  const { transactionNo, queueNo } = initialQueueAndTransactionNumbers();

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours()}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  const cartTotal = cartData.reduce((acc, dish) => acc + dish.totalPrice, 0);
  const serviceFees = 0.1 * cartTotal;
  const total = cartTotal + serviceFees;

  const [waitingTime, setWaitingTime] = React.useState(10 / 60);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.abs(waitingTime) > 1e-5) {
        setWaitingTime((prevTime) => prevTime - 1 / 60);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [waitingTime]);

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
          <Typography variant="subtitle">{queueNo}</Typography>
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
                {(waitingTime * 60).toFixed(0)} seconds
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
          {/* <Typography variant="h6" display="block">
            Store: {storeInfo.storeName}
          </Typography> */}
          <Typography variant="subtitle" display="block">
            Transaction Date: {formattedDate}
          </Typography>
          <Typography variant="subtitle" display="block">
            Transaction Time: {formattedTime}
          </Typography>
          <Typography variant="subtitle" display="block">
            Transaction No.: {transactionNo}
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
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {cartData.map((dish) => (
              <ListItem alignItems="flex-start" key={dish.id}>
                <Grid container justifyContent="space-between">
                  <Typography variant="subtitle1">
                    {dish.name} * {dish.quantity}
                  </Typography>
                  <Typography variant="subtitle1" align="right">
                    ${dish.totalPrice.toFixed(2)}
                  </Typography>
                </Grid>
              </ListItem>
            ))}
          </List>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">Service Fees</Typography>
              <Typography variant="subtitle1" align="right">
                ${serviceFees.toFixed(2)}
              </Typography>
            </Grid>
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <Grid container justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" align="right">
                ${total.toFixed(2)}
              </Typography>
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
          <Typography variant="body1" display="block">
            Thank you for dining with us!
          </Typography>
          <Typography variant="body1" display="block">
            We hope to see you soon!
          </Typography>
        </List>
      </Box>
    </Container>
  );
}
