import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  MenuItem,
  Box,
} from "@mui/material";

export default function VendorAccount() {
  // Sample vendor account data
  const [accountDetails, setAccountDetails] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "+1234567890",
    address: "123 Vendor Street, City, Country",
  });

  // Sample account settings
  const [accountSettings, setAccountSettings] = useState({
    receiveNotifications: true,
    preferredLanguage: "English",
  });

  // Function to handle form submission for updating account details
  const handleAccountUpdate = (event) => {
    event.preventDefault();
    // Handle updating account details here
    console.log("Updated Account Details:", accountDetails);
  };

  // Function to handle form submission for updating account settings
  const handleSettingsUpdate = (event) => {
    event.preventDefault();
    // Handle updating account settings here
    console.log("Updated Account Settings:", accountSettings);
  };
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Vendor Account
        </Typography>

        <Typography variant="h5" gutterBottom>
          Account Details
        </Typography>

        <form onSubmit={handleAccountUpdate}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            value={accountDetails.fullName}
            onChange={(e) =>
              setAccountDetails({ ...accountDetails, fullName: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={accountDetails.email}
            onChange={(e) =>
              setAccountDetails({ ...accountDetails, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            value={accountDetails.phoneNumber}
            onChange={(e) =>
              setAccountDetails({
                ...accountDetails,
                phoneNumber: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            multiline
            rows={4}
            value={accountDetails.address}
            onChange={(e) =>
              setAccountDetails({
                ...accountDetails,
                address: e.target.value,
              })
            }
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Update Account
            </Button>
          </Box>
        </form>

        <Typography variant="h5" gutterBottom mt={4}>
          Account Settings
        </Typography>

        <form onSubmit={handleSettingsUpdate}>
          <FormControlLabel
            control={
              <Checkbox
                checked={accountSettings.receiveNotifications}
                onChange={(e) =>
                  setAccountSettings({
                    ...accountSettings,
                    receiveNotifications: e.target.checked,
                  })
                }
              />
            }
            label="Receive Notifications"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Preferred Language</InputLabel>
            <Select
              value={accountSettings.preferredLanguage}
              onChange={(e) =>
                setAccountSettings({
                  ...accountSettings,
                  preferredLanguage: e.target.value,
                })
              }
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Chinese">Chinese</MenuItem>
              <MenuItem value="Malay">Malay</MenuItem>
            </Select>
          </FormControl>
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Update Settings
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
