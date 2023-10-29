import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import { CUSTOMER_ID_GLOBAL } from "../../SessionID";

const orderTypeOptions = ["Takeaway", "Dine-in", "Delivery"];
const paymentTypeOptions = ["Cash", "Credit/Debit Card", "3rd Party"];

const handleSubmitOrder = async (pathOrderId) => {
  const payload = {
    customerId: CUSTOMER_ID_GLOBAL,
    orderId: pathOrderId,
    orderType:
      orderTypeOptions[Math.floor(Math.random() * orderTypeOptions.length)],
    paymentType:
      paymentTypeOptions[Math.floor(Math.random() * paymentTypeOptions.length)],
    orderDateTime: new Date(
      new Date().getTime() + 8 * 60 * 60 * 1000 // agg 8 hours for gmt+8
    ).toISOString(),
  };

  axios
    .put("http://localhost:8600/submit-order", payload)
    .then((response) => {
      console.log("Order submitted successfully", response);
      window.location.href = `/receipt/${pathOrderId}`;
      // You can perform any additional actions here if needed.
    })
    .catch((error) => {
      console.error("Error submitting order", error);
    });
};

export default function MockPayment() {
  const location = useLocation();
  const str = location.pathname;
  const pathOrderId = str.slice(str.lastIndexOf("/") + 1);

  const [waitingTime, setWaitingTime] = React.useState(3);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (waitingTime > 0) {
        setWaitingTime((prevTime) => prevTime - 1);
      } else {
        clearInterval(intervalId);
        handleSubmitOrder(pathOrderId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [waitingTime]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      maxheight="ys"
      style={{ height: "70vh" }}
      alignItems="center"
    >
      <Box sx={{ mt: 4, textAlign: "center", minWidth: 300 }}>
        <Typography variant="h6">
          Payment processing for order #{pathOrderId}
        </Typography>
        <Typography sx={{ mt: 4 }} variant="h4">
          {waitingTime.toFixed(0)}
        </Typography>
      </Box>
    </Container>
  );
}
