import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

export default function VendorSales() {
  const [period, setPeriod] = useState("daily");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Function to get the day of the week from a date string
  const getDayOfWeek = (dateString) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0]; // Gets today's date in "YYYY-MM-DD" format
    // Mock data for sales
    const salesData = [
      {
        date: todayDate,
        store: "Store A",
        dish: "Dish 1",
        sales: 25,
        price: 5,
      },
      {
        date: todayDate,
        store: "Store B",
        dish: "Dish 2",
        sales: 30,
        price: 7,
      },
      {
        date: todayDate,
        store: "Store A",
        dish: "Dish 3",
        sales: 15,
        price: 6,
      },
      {
        date: todayDate,
        store: "Store B",
        dish: "Dish 1",
        sales: 20,
        price: 5,
      },
      {
        date: todayDate,
        store: "Store A",
        dish: "Dish 2",
        sales: 28,
        price: 7,
      },
    ];
    // ... add more data as needed

    const selectedDateTime = new Date(selectedDate);

    switch (period) {
      case "daily":
        setFilteredData(salesData.filter((sale) => sale.date === selectedDate));
        break;

      case "weekly":
        const startOfWeek = new Date(selectedDateTime);
        startOfWeek.setDate(
          selectedDateTime.getDate() - selectedDateTime.getDay()
        );
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        setFilteredData(
          salesData.filter(
            (sale) =>
              new Date(sale.date) >= startOfWeek &&
              new Date(sale.date) <= endOfWeek
          )
        );
        break;

      case "monthly":
        setFilteredData(
          salesData.filter(
            (sale) =>
              new Date(sale.date).getMonth() === selectedDateTime.getMonth() &&
              new Date(sale.date).getFullYear() ===
                selectedDateTime.getFullYear()
          )
        );
        break;

      case "yearly":
        setFilteredData(
          salesData.filter(
            (sale) =>
              new Date(sale.date).getFullYear() ===
              selectedDateTime.getFullYear()
          )
        );
        break;

      default:
        setFilteredData([]);
    }
  }, [period, selectedDate]);

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Vendor Transactions
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
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
              <MenuItem value={"yearly"}>Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Dish</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Sales</TableCell>
                <TableCell>Money Earned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{getDayOfWeek(row.date)}</TableCell>
                  <TableCell>{row.store}</TableCell>
                  <TableCell>{row.dish}</TableCell>
                  <TableCell>{`$${row.price}`}</TableCell>
                  <TableCell>{row.sales}</TableCell>
                  <TableCell>{`$${row.sales * row.price}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
