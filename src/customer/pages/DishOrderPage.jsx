import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import food1 from "../images/food1.jpg";

export default function DishOrderPage(props) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Base Price");
  const [addOnsOne, setAddOnsOne] = useState(false);
  const [addOnsTwo, setAddOnsTwo] = useState(false);
  const [addOnsThree, setAddOnsThree] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddOnsOneChange = (event) => {
    setAddOnsOne(event.target.checked);
  };

  const handleAddOnsTwoChange = (event) => {
    setAddOnsTwo(event.target.checked);
  };

  const handleAddOnsThreeChange = (event) => {
    setAddOnsThree(event.target.checked);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: "500px" }}>
        <CardMedia
          component="img"
          sx={{ width: "100%" }}
          image={food1}
          alt="Dish A"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Dish A
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Dish A Description - Includes xxx for portion size. Pick in the
            comfort of your home.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                  labelId="size-select-label"
                  id="size-select"
                  value={size}
                  onChange={handleSizeChange}
                >
                  <MenuItem value={"Base Price"}>Base Price</MenuItem>
                  <MenuItem value={"Kids"}>Kids</MenuItem>
                  <MenuItem value={"Small"}>Small</MenuItem>
                  <MenuItem value={"Large"}>Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" color="text.secondary">
                  Main Ingredient
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsOne}
                        onChange={handleAddOnsOneChange}
                      />
                    }
                    label="Main Ingredient One"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsTwo}
                        onChange={handleAddOnsTwoChange}
                      />
                    }
                    label="Main Ingredient Two"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsThree}
                        onChange={handleAddOnsThreeChange}
                      />
                    }
                    label="Main Ingredient Three"
                  />
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" color="text.secondary">
                  Add-Ons:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsOne}
                        onChange={handleAddOnsOneChange}
                      />
                    }
                    label="Add-Ons One"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsTwo}
                        onChange={handleAddOnsTwoChange}
                      />
                    }
                    label="Add-Ons Two"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsThree}
                        onChange={handleAddOnsThreeChange}
                      />
                    }
                    label="Add-Ons Three"
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="quantity-select-label">Quantity</InputLabel>
                <Select
                  labelId="quantity-select-label"
                  id="quantity-select"
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {[...Array(10).keys()].map((i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="contained">ADD TO CART</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
