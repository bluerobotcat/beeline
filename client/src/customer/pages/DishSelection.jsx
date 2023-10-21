import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl, // Import Checkbox
  FormControlLabel, // Import FormControlLabel
  Grid,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import food1 from "../images/food1.jpg";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useCart } from "./CartProvider";
import { CUSTOMER_ID_GLOBAL } from "../../SessionID";

export default function DishSelection({ dish: propDish }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const dish = propDish ||
    location.state?.dish || {
      name: "Dish A",
      description: "Dish A Description",
      image: food1,
      basePrice: 10,
      sizes: [
        { id: "Small", name: "Small", multiplier: 0.9 },
        { id: "Regular", name: "Regular", multiplier: 1.0 },
        { id: "Large", name: "Large", multiplier: 1.1 },
      ],
      mainIngredients: [
        { name: "Ingredient One", price: 0 },
        { name: "Ingredient Two", price: 0 },
        { name: "Ingredient Three", price: 0 },
      ],

      addOns: [
        { name: "Add-Ons One", price: 1 },
        { name: "Add-Ons Two", price: 1 },
        { name: "Add-Ons Three", price: 1.5 },
      ],
    };

  const [quantity, setQuantity] = useState(1);

  const [selectedMainIngredients, setSelectedMainIngredients] = useState(
    dish.mainIngredients.map((_, idx) => idx)
  );

  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const defaultSizeId = dish.sizes && dish.sizes[0] ? dish.sizes[0].id : null;
  const [selectedSizes, setSelectedSizes] = useState(
    defaultSizeId ? [defaultSizeId] : []
  );

  const str = location.pathname;
  const number = str.slice(str.lastIndexOf("/") + 1);
  const [data, setData] = useState({
    dishId: 0,
    dishName: "",
    dishDescription: "",
    dishPrice: 0.0,
    dishImgPath: process.env.PUBLIC_URL + "/images/",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:8600/dish/${number}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [number]);

  const handleSingleSelectionChange = (setFunction, id) => {
    setFunction([id]);
  };

  const handleSizeChange = (sizeId) => {
    setSelectedSizes([sizeId]);
  };

  const handleAddOnsChange = (idx) => {
    setSelectedAddOns((prevAddOns) =>
      prevAddOns.includes(idx)
        ? prevAddOns.filter((i) => i !== idx)
        : [...prevAddOns, idx]
    );
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // total price and surcharge

  const totalSizePrice = selectedSizes
    ? selectedSizes.reduce(
        (acc, selectedSize) =>
          acc +
          dish.sizes.find((size) => size.id === selectedSize).multiplier *
            data.dishPrice,
        0
      )
    : 0;

  const totalMainIngredientsPrice = selectedMainIngredients
    ? selectedMainIngredients.reduce(
        (acc, idx) => acc + dish.mainIngredients[idx].price,
        0
      )
    : 0;

  const totalAddOnsPrice = selectedAddOns
    ? selectedAddOns.reduce((acc, idx) => acc + dish.addOns[idx].price, 0)
    : 0;

  const totalPrice =
    totalSizePrice + totalMainIngredientsPrice + totalAddOnsPrice;

  const surchargePrice = totalPrice - data.dishPrice;

  const totalSizeMod = selectedSizes
    ? selectedSizes.reduce(
        (acc, selectedSize) =>
          acc + "; " + dish.sizes.find((size) => size.id === selectedSize).name,
        ""
      )
    : "";

  const totalMainIngredientsMod = selectedMainIngredients
    ? selectedMainIngredients.reduce(
        (acc, idx) => acc + "; " + dish.mainIngredients[idx].name,
        ""
      )
    : "";

  const totalAddOnsMod = selectedAddOns
    ? selectedAddOns.reduce(
        (acc, idx) => acc + "; " + dish.addOns[idx].name,
        ""
      )
    : "";

  // total modifier text

  const totalModifiers =
    totalSizeMod + totalMainIngredientsMod + totalAddOnsMod;

  const handleAddToCart = async () => {
    const cartDataToPost = {
      customerId: CUSTOMER_ID_GLOBAL,
      dishId: number,
      orderItemQty: quantity,
      orderModifier: totalModifiers.length > 0 ? totalModifiers.slice(2) : "",
      orderSurcharge: Math.round(surchargePrice, 2),
    };

    try {
      const response = await axios.post(
        "http://localhost:8600/order-item",
        cartDataToPost
      );
      console.log("Added to cart: ", cartDataToPost);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleMainIngredientChange = (idx) => {
    if (selectedMainIngredients.includes(idx)) {
      // Prevent unchecking if it's the only one checked
      if (selectedMainIngredients.length === 1) {
        return;
      }
      setSelectedMainIngredients((prevState) =>
        prevState.filter((i) => i !== idx)
      );
    } else {
      setSelectedMainIngredients((prevState) => [...prevState, idx]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: { xs: "90vh", md: "80vh" }, // Adjust height for mobile vs desktop
        py: 1,
        px: { xs: 1, md: 3 }, // Adjust horizontal padding for mobile vs desktop
      }}
    >
      <Card
        sx={{
          width: { xs: "95%", md: "500px" }, // Full width on mobile, fixed width on desktop
          mx: "auto",
          my: 2,
          boxShadow: 3,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
          image={
            data.dishImgPath.startsWith("http")
              ? data.dishImgPath
              : `${process.env.PUBLIC_URL}/images/${data.dishImgPath}`
          }
          alt={data.dishName}
        />
        <CardContent sx={{ padding: "16px 32px" }}>
          <Typography variant="h5" component="div">
            {data.dishName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {data.dishDescription}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" color="text.secondary">
                  Size
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {dish.sizes.map((size) => (
                    <FormControlLabel
                      key={size.id}
                      control={
                        <Checkbox
                          checked={selectedSizes.includes(size.id)}
                          onChange={() =>
                            handleSingleSelectionChange(
                              setSelectedSizes,
                              size.id
                            )
                          }
                        />
                      }
                      label={`${size.name} ($${(
                        size.multiplier * data.dishPrice
                      ).toFixed(2)})`}
                    />
                  ))}
                </Box>
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
                      key={idx}
                      control={
                        <Checkbox
                          checked={selectedMainIngredients.includes(idx)}
                          onChange={() => handleMainIngredientChange(idx)}
                        />
                      }
                      label={ingredient.name} // Removed the price display
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
                      key={idx}
                      control={
                        <Checkbox
                          checked={selectedAddOns.includes(idx)}
                          onChange={() => handleAddOnsChange(idx)}
                        />
                      }
                      label={`${addOn.name} (+$${addOn.price.toFixed(2)})`}
                    />
                  ))}
                </Box>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* <FormControl
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
                    {/*[...Array(10).keys()].map((i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))
                  </Select>
                </Box>
              </FormControl> */}
              <Grid
                item
                xs={12}
                x={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FormControl
                  sx={{
                    m: 1,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    variant="outlined"
                    color="primary"
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </Button>
                  <Box
                    sx={{
                      mx: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "40px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      padding: "0 10px",
                    }}
                  >
                    {quantity}
                  </Box>
                  <Button
                    onClick={() =>
                      setQuantity((prev) => (prev < 10 ? prev + 1 : 10))
                    }
                    variant="outlined"
                    color="primary"
                    disabled={quantity >= 10}
                  >
                    <AddIcon />
                  </Button>
                </FormControl>
                <Box sx={{ m: 2 }} />
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
                <Box sx={{ m: 2 }} />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    onClick={handleAddToCart}
                    component={Link}
                    to="/cart"
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                  >
                    ADD TO CART
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
