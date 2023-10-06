import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Link } from "react-router-dom";

export default function VendorDashboard() {
  const [selectedDay, setSelectedDay] = React.useState("Today");

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" color="primary" gutterBottom>
              DASHBOARD
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
                <MenuItem value={"Today"}>Today</MenuItem>
                <MenuItem value={"Yesterday"}>Yesterday</MenuItem>
                <MenuItem value={"TwoDaysAgo"}>2 days ago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box height="100%">
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/vendororders"
                  color="secondary"
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    paddingTop: "50%", // Adjust this value to set the button height
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Order Status: ON
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box height="100%">
                <Box height="100%">
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/vendortransactions"
                    color="secondary"
                    sx={{
                      width: "100%",
                      borderRadius: "4px",
                      paddingTop: "50%", // Adjust this value to set the button height
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Transactions
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box height="100%">
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/vendorinventory"
                  color="secondary"
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    paddingTop: "50%", // Adjust this value to set the button height
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Inventory Level: LOW
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box height="100%">
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/vendoranalytics"
                  color="secondary"
                  sx={{
                    width: "100%",
                    borderRadius: "4px",
                    paddingTop: "50%", // Adjust this value to set the button height
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Analytics
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
