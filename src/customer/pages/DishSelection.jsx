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
import { Link } from "react-router-dom";

export default function DishSelection(props) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Base Price ($10)");
  const [mainIngredientOne, setMainIngredientOne] = useState(false);
  const [mainIngredientTwo, setMainIngredientTwo] = useState(false);
  const [mainIngredientThree, setMainIngredientThree] = useState(false);
  const [addOnsOne, setAddOnsOne] = useState(false);
  const [addOnsTwo, setAddOnsTwo] = useState(false);
  const [addOnsThree, setAddOnsThree] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleMainIngredientOneChange = (event) => {
    setMainIngredientOne(event.target.checked);
  };

  const handleMainIngredientTwoChange = (event) => {
    setMainIngredientTwo(event.target.checked);
  };

  const handleMainIngredientThreeChange = (event) => {
    setMainIngredientThree(event.target.checked);
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

  let price = 10;
  if (size === "Kids ($8)") {
    price = 8;
  } else if (size === "Small ($12)") {
    price = 12;
  } else if (size === "Large ($15)") {
    price = 15;
  } else if (size === "Main Ingredient One ($11)") {
    price = 11;
  } else if (size === "Main Ingredient Two ($13)") {
    price = 13;
  } else if (size === "Main Ingredient Three ($14)") {
    price = 14;
  }

  let mainIngredientPrice = 0;
  if (mainIngredientOne) {
    mainIngredientPrice += 1;
  }

  if (mainIngredientTwo) {
    mainIngredientPrice += 2;
  }

  if (mainIngredientThree) {
    mainIngredientPrice += 3;
  }

  let addOnsPrice = 0;
  if (addOnsOne) {
    addOnsPrice += 1;
  }

  if (addOnsTwo) {
    addOnsPrice += 2;
  }

  if (addOnsThree) {
    addOnsPrice += 3;
  }

  let totalPrice = price + addOnsPrice;

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
          <div />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                sx={{ m: 1, display: "flex", flexDirection: "column" }}
              >
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                  labelId="size-select-label"
                  id="size-select"
                  value={size}
                  onChange={handleSizeChange}
                >
                  <MenuItem value={"Base Price ($10)"}>
                    Base Price ($10)
                  </MenuItem>
                  <MenuItem value={"Kids ($8)"}>Kids ($8)</MenuItem>
                  <MenuItem value={"Small ($12)"}>Small ($12)</MenuItem>
                  <MenuItem value={"Large ($15)"}>Large ($15)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" color="text.secondary">
                  Main Ingredient
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mainIngredientOne}
                        onChange={handleMainIngredientOneChange}
                      />
                    }
                    label="Main Ingredient One (+$0)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mainIngredientTwo}
                        onChange={handleMainIngredientTwoChange}
                      />
                    }
                    label="Main Ingredient Two (+$2)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mainIngredientThree}
                        onChange={handleMainIngredientThreeChange}
                      />
                    }
                    label="Main Ingredient Three (+$3)"
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
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
                    label="Add-Ons One (+$1)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsTwo}
                        onChange={handleAddOnsTwoChange}
                      />
                    }
                    label="Add-Ons Two (+$1)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={addOnsThree}
                        onChange={handleAddOnsThreeChange}
                      />
                    }
                    label="Add-Ons Three (+$1.50)"
                  />
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                sx={{ m: 1, display: "flex", flexDirection: "column" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                </Box>
              </FormControl>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  component="div"
                  fontWeight="bold"
                  sx={{ textAlign: "center" }}
                >
                  Total Price: ${totalPrice.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button component={Link} to="/cart" variant="contained">
                  ADD TO CART
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
