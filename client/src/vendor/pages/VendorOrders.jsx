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
    orderTime: new Date("2023-10-16T10:30:00"), // Upcoming date
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "2 x Product A, 3 x Product B",
    status: "new",
  },
  {
    personName: "Jane Smith",
    orderTime: new Date("2023-10-16T14:45:00"), // Upcoming date
    orderType: "In-store",
    paymentType: "Cash",
    orderDetails: "1 x Product C, 2 x Product D",
    status: "pending",
  },
  {
    personName: "Alice Johnson",
    orderTime: new Date("2023-10-15T18:30:00"), // Upcoming date
    orderType: "Online",
    paymentType: "Credit Card",
    orderDetails: "3 x Product A, 1 x Product B",
    status: "new",
  },
  // Add more sample orders here
];

const STATUSES = ["new", "pending", "complete"];

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const StyledOrderCard = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

function OrdersList({ orders }) {
  return (
    <Box mt={2}>
      {orders.map((order, index) => (
        <Box
          key={index}
          sx={{
            border: "1px solid #ccc",
            padding: "16px",
            marginBottom: "8px",
          }}
        >
          <Typography variant="subtitle1">
            Person: {order.personName}
          </Typography>
          <Typography variant="subtitle2">
            Time: {order.orderTime.toLocaleString()}
          </Typography>
          <Typography variant="body2">Type: {order.orderType}</Typography>
          <Typography variant="body2">Payment: {order.paymentType}</Typography>
          <Typography variant="body2">Details:</Typography>
          <List>
            {order.orderDetails.split(",").map((detail, index) => (
              <ListItem key={index}>
                <Typography variant="body2">{detail.trim()}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}

function OrderItem({ order, onChangeStatus }) {
  return (
    <StyledOrderCard elevation={2}>
      <Typography variant="h6">Person: {order.personName}</Typography>
      <Typography variant="body1" color="textSecondary">
        Time: {order.orderTime.toLocaleString()}
      </Typography>
      <Typography variant="body2">Type: {order.orderType}</Typography>
      <Typography variant="body2">Payment: {order.paymentType}</Typography>
      <Typography variant="body2" gutterBottom>
        Details:
      </Typography>
      <List>
        {order.orderDetails.split(",").map((detail, index) => (
          <ListItem key={index}>
            <Typography variant="body2">{detail.trim()}</Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant="body2" gutterBottom>
        Status: {order.status}
      </Typography>
      <Box mt={1} display="flex" justifyContent="space-between">
        {STATUSES.map((status) => (
          <Button
            key={status}
            variant="outlined"
            size="small"
            disabled={order.status === status}
            onClick={() => onChangeStatus(order, status)}
            sx={{ textTransform: "none" }}
          >
            Set to {status}
          </Button>
        ))}
      </Box>
    </StyledOrderCard>
  );
}

export default function VendorOrder() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [period, setPeriod] = useState("daily");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [currentOrders, setCurrentOrders] = useState(orders);

  const handleStatusChange = (changedOrder, newStatus) => {
    const updatedOrders = currentOrders.map((order) =>
      order === changedOrder ? { ...order, status: newStatus } : order
    );
    setCurrentOrders(updatedOrders);
  };

  useEffect(() => {
    const selectedDateTime = new Date(selectedDate);
    let filtered = [];

    switch (period) {
      case "daily":
        filtered = currentOrders.filter((order) => {
          const orderDate = new Date(order.orderTime)
            .toISOString()
            .split("T")[0];
          return orderDate === selectedDate;
        });
        break;

      case "weekly":
        const startOfWeek = new Date(selectedDateTime);
        startOfWeek.setDate(
          selectedDateTime.getDate() - selectedDateTime.getDay()
        );
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        filtered = orders.filter((order) => {
          const orderDate = new Date(order.orderTime);
          return orderDate >= startOfWeek && orderDate <= endOfWeek;
        });
        break;

      case "monthly":
        filtered = orders.filter((order) => {
          const orderDate = new Date(order.orderTime);
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
            <Tab label="New" />
            <Tab label="Pending" />
            <Tab label="Complete" />
          </Tabs>

          <Box mt={2}>
            {filteredOrders.map((order, index) => {
              if (STATUSES[selectedTab] === order.status) {
                return (
                  <OrderItem
                    key={index}
                    order={order}
                    onChangeStatus={handleStatusChange}
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
