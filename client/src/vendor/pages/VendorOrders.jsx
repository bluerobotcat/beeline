import React, { useState } from "react";
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
} from "@mui/material";

// Sample order data
const orders = [
  {
    personName: "John Doe",
    orderTime: new Date("2023-08-22T10:30:00"),
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "2 x Product A, 3 x Product B",
    status: "new", // or "pending" or "complete"
  },
  {
    personName: "Jane Smith",
    orderTime: new Date("2023-08-29T14:45:00"),
    orderType: "In-store",
    paymentType: "Cash",
    orderDetails: "1 x Product C, 2 x Product D",
    status: "pending",
  },
  {
    personName: "John Doe",
    orderTime: new Date("2023-08-22T10:30:00"),
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "2 x Product A, 3 x Product B",
    status: "new", // or "pending" or "complete"
  },
  {
    personName: "Jane Smith",
    orderTime: new Date("2023-06-29T14:45:00"),
    orderType: "In-store",
    paymentType: "Cash",
    orderDetails: "1 x Product C, 2 x Product D",
    status: "pending",
  },
  {
    personName: "John Doe",
    orderTime: new Date("2023-08-22T18:30:00"),
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "2 x Product A, 3 x Product B",
    status: "pending", // or "new" or "complete"
  },
  {
    personName: "Jane Smith",
    orderTime: new Date("2023-06-29T14:45:00"),
    orderType: "In-store",
    paymentType: "Cash",
    orderDetails: "1 x Product C, 2 x Product D",
    status: "pending",
  },
  {
    personName: "John Doe",
    orderTime: new Date("2023-09-10T10:30:00"), // Upcoming date
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "2 x Product A, 3 x Product B",
    status: "new",
  },
  {
    personName: "Jane Smith",
    orderTime: new Date("2023-09-12T14:45:00"), // Upcoming date
    orderType: "In-store",
    paymentType: "Cash",
    orderDetails: "1 x Product C, 2 x Product D",
    status: "pending",
  },
  {
    personName: "Alice Johnson",
    orderTime: new Date("2023-09-15T18:30:00"), // Upcoming date
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "3 x Product A, 1 x Product B",
    status: "new",
  },
  // Add more sample orders here
];

export default function VendorDashboard() {
  const [selectedDay, setSelectedDay] = useState("Today");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const dateOptions = [
    { label: "Today", value: new Date() },
    {
      label: "Yesterday",
      value: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
    {
      label: "2 days ago",
      value: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
  ];
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" color="primary" gutterBottom>
              ORDERS
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="day-select-label">Day</InputLabel>
              <Select
                labelId="day-select-label"
                id="day-select"
                value={selectedDay}
                label="Day"
                onChange={handleDayChange}
              >
                {dateOptions.map((option, index) => (
                  <MenuItem key={index} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
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
            <Tab label="New" />
            <Tab label="Pending" />
            <Tab label="Complete" />
          </Tabs>

          <Box mt={2}>
            {orders.map((order, index) => {
              const orderDate = new Date(order.orderTime);
              const currentDate = new Date();
              const currentYear = currentDate.getFullYear();
              const currentMonth = currentDate.getMonth();
              const currentDay = currentDate.getDate();

              const orderYear = orderDate.getFullYear();
              const orderMonth = orderDate.getMonth();
              const orderDay = orderDate.getDate();

              const isOrderToday =
                selectedDay === "Today" &&
                orderYear === currentYear &&
                orderMonth === currentMonth &&
                orderDay === currentDay;

              const isOrderNew = order.status === "new";
              const isOrderPending = order.status === "pending";
              const isOrderComplete = order.status === "complete";

              let isOrderTab = false;
              if (selectedTab === 0) {
                isOrderTab = isOrderNew;
              } else if (selectedTab === 1) {
                isOrderTab = isOrderPending;
              } else if (selectedTab === 2) {
                isOrderTab = isOrderComplete;
              }

              if (isOrderToday && isOrderTab) {
                return (
                  <Box
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      padding: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Person who ordered: {order.personName}
                    </Typography>
                    <Typography variant="subtitle2">
                      Order Time: {orderDate.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Order Type: {order.orderType}
                    </Typography>
                    <Typography variant="body2">
                      Payment Type: {order.paymentType}
                    </Typography>
                    <Typography variant="body2">Order Details:</Typography>
                    <Typography variant="body2" sx={{ marginLeft: "16px" }}>
                      {order.orderDetails}
                    </Typography>
                  </Box>
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
