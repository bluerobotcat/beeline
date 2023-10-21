import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  Tab,
  List,
  ListItem,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { VENDOR_ID_GLOBAL } from "../../SessionID";

// // Sample order data
// const orders = [
//   {
//     personName: "John Doe",
//     orderDateTime: new Date("2023-10-22T10:30:00"),
//     orderType: "Online",
//     paymentType: "Credit Card",
//     orderDetails: "2 x Product A, 3 x Product B",
//     orderStatus: "new", // or "pending" or "complete"
//   },
//   {
//     personName: "Jane Smith",
//     orderDateTime: new Date("2023-10-29T14:45:00"),
//     orderType: "In-store",
//     paymentType: "Cash",
//     orderDetails: "1 x Product C, 2 x Product D",
//     orderStatus: "pending",
//   },
//   // Add more sample orders here
// ];

const statuses = ["Pending", "Completed"];

const StyledOrderCard = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

// function OrderItem({ order, onChangeStatus }) {
function OrderItem({ order }) {
  return (
    <StyledOrderCard elevation={2}>
      <Box mx={1.5} my={1.5}>
        <Typography variant="h5" mb={1.5}>
          Person: {order.customerName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Date/Time:{" "}
          {order.orderDateTime.toLocaleString("en-GB", { hour12: true })}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Transaction ID: {order.orderId}
          &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Order Type:{" "}
          {order.orderType}
          &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Payment:{" "}
          {order.paymentType}
        </Typography>
        {/* Typography variant="body2">Order ID: {order.orderId}</Typography>
        <Typography variant="body2">Type: {order.orderType}</Typography>
        <Typography variant="body2">Payment: {order.paymentType}</Typography> */}
        <Typography variant="h6" mt={1.5}>
          Order Details:
        </Typography>
        <List sx={{ mb: 2 }}>
          {order.dishes.map((dish) => (
            <ListItem>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2">
                  {dish.orderItemQty} x {dish.dishName.trim()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dish.orderModifier}
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
        <Box mr={3} display="flex" justifyContent="space-between">
          {statuses.map((status) => (
            <Button
              key={status}
              variant="outlined"
              size="small"
              disabled={order.orderStatus === status}
              // onClick={() => onChangeStatus(order, status)}
              sx={{ textTransform: "none" }}
            >
              Set to {status}
            </Button>
          ))}
        </Box>
      </Box>
    </StyledOrderCard>
  );
}

export default function VendorOrder() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [period, setPeriod] = useState("monthly");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0] // Adjust for gmt+8
  );

  const [currentOrders, setCurrentOrders] = useState([]);

  // const handleStatusChange = (changedOrder, newStatus) => {
  //   const updatedOrders = currentOrders.map((order) =>
  //     order === changedOrder ? { ...order, orderStatus: newStatus } : order
  //   );
  //   setCurrentOrders(updatedOrders);
  // };

  const [data, setData] = useState({ storeId: 0, orders: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8600/view-orders/${VENDOR_ID_GLOBAL}`)
      .then((response) => {
        setData(response.data);
        const dataWithDate = response.data.orders.map((item) => ({
          ...item,
          orderDateTime: new Date(item.orderDateTime),
        }));
        setCurrentOrders(dataWithDate);
        // console.log(response); // Use response.data instead of response.body
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const selectedDateTime = new Date(selectedDate);
    let filtered = [];

    switch (period) {
      case "daily":
        filtered = currentOrders.filter((order) => {
          const orderDate = new Date(order.orderDateTime);
          return (
            orderDate.getDate() === selectedDateTime.getDate() &&
            orderDate.getMonth() === selectedDateTime.getMonth() &&
            orderDate.getFullYear() === selectedDateTime.getFullYear()
          );
        });
        break;

      case "weekly":
        const startOfWeek = new Date(selectedDateTime);
        startOfWeek.setDate(
          selectedDateTime.getDate() - selectedDateTime.getDay()
        );
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        filtered = currentOrders.filter((order) => {
          const orderDate = new Date(order.orderDateTime);
          return orderDate >= startOfWeek && orderDate <= endOfWeek;
        });
        console.log(startOfWeek);
        break;

      case "monthly":
        filtered = currentOrders.filter((order) => {
          const orderDate = new Date(order.orderDateTime);
          return (
            orderDate.getMonth() === selectedDateTime.getMonth() &&
            orderDate.getFullYear() === selectedDateTime.getFullYear()
          );
        });
        break;

      default:
        filtered = [];
    }

    setFilteredOrders(filtered);
  }, [period, selectedDate, currentOrders]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" color="primary" gutterBottom>
              ORDERS
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              id="date"
              label="Select Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="period-select-label">Period</InputLabel>
              <Select
                labelId="period-select-label"
                id="period-select"
                value={period}
                label="Period"
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"weekly"}>Weekly</MenuItem>
                <MenuItem value={"monthly"}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Tabs
            value={selectedTab}
            onChange={(event, newValue) => setSelectedTab(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Pending" />
            <Tab label="Completed" />
          </Tabs>

          <Box mt={2}>
            {filteredOrders.map((order, index) => {
              if (statuses[selectedTab] === order.orderStatus) {
                return (
                  <OrderItem
                    key={index}
                    order={order}
                    // onChangeStatus={handleStatusChange}
                  />
                );
              }
              return null;
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
