import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
import { Link, useLocation } from "react-router-dom";
import food1 from "../images/food1.jpg";

export default function DishSelection({ dish: propDish }) {
  // <Link to={`/dishselection/${dish.item_id}`} />;
  const location = useLocation();
  const dish = propDish ||
    location.state?.dish || {
      name: "Dish A",
      description: "Dish A Description",
      image: food1,
      basePrice: 10,
      sizes: [
        { name: "Kids", price: 8 },
        { name: "Small", price: 12 },
        { name: "Large", price: 15 },
      ],
      mainIngredients: [
        { name: "Ingredient One", price: 0 },
        { name: "Ingredient Two", price: 2 },
        { name: "Ingredient Three", price: 3 },
      ],
      addOns: [
        { name: "Add-Ons One", price: 1 },
        { name: "Add-Ons Two", price: 1 },
        { name: "Add-Ons Three", price: 1.5 },
      ],
    };

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(dish.basePrice);
  const [selectedMainIngredients, setSelectedMainIngredients] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // If no dish data is available, redirect or show an error
  if (!dish) {
    return <div>No dish selected!</div>;
  }

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleMainIngredientChange = (idx) => {
    setSelectedMainIngredients((prevState) =>
      prevState.includes(idx)
        ? prevState.filter((i) => i !== idx)
        : [...prevState, idx]
    );
  };

  const handleAddOnsChange = (idx) => {
    setSelectedAddOns((prevState) =>
      prevState.includes(idx)
        ? prevState.filter((i) => i !== idx)
        : [...prevState, idx]
    );
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const totalPrice =
    size +
    selectedMainIngredients.reduce(
      (acc, idx) => acc + dish.mainIngredients[idx].price,
      0
    ) +
    selectedAddOns.reduce((acc, idx) => acc + dish.addOns[idx].price, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        py: 3,
      }}
    >
      <Card
        sx={{
          maxWidth: "500px",
          width: "100%",
          mx: "auto",
          my: 2,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          image={dish.image}
          alt={dish.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {dish.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {dish.description}
          </Typography>
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
                  <MenuItem value={dish.basePrice}>
                    Base Price (${dish.basePrice})
                  </MenuItem>
                  {dish.sizes.map((size, idx) => (
                    <MenuItem key={idx} value={size.price}>
                      {size.name} (${size.price})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" color="text.secondary">
                  Main Ingredient
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {dish.mainIngredients.map((ingredient, idx) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedMainIngredients.includes(idx)}
                          onChange={() => handleMainIngredientChange(idx)}
                        />
                      }
                      label={`${ingredient.name} (+$${ingredient.price})`}
                    />
                  ))}
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" color="text.secondary">
                  Add-Ons
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {dish.addOns.map((addOn, idx) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedAddOns.includes(idx)}
                          onChange={() => handleAddOnsChange(idx)}
                        />
                      }
                      label={`${addOn.name} (+$${addOn.price})`}
                    />
                  ))}
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
                  Total Price: ${(totalPrice * quantity).toFixed(2)}
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
