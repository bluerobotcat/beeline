import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

export default function AddNewDish() {
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      expanded: true,
      name: "",
      unit: "",
      standardPortion: "",
      quantity: "",
      preparationType: "",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Collect all the ingredients data
    const ingredientsData = ingredients.map((ingredient, index) => ({
      name: formData.get(`ingredientname${index}`),
      unit: formData.get(`unit${index}`),
      standardPortion: formData.get(`standardportion${index}`),
      quantity: formData.get(`quantity${index}`),
      preparationType: formData.get(`preparationtype${index}`),
    }));

    console.log("Ingredients Data:", ingredientsData);
  };

  const handleAccordionClick = (index) => () => {
    const newIngredients = [...ingredients];
    newIngredients[index].expanded = !newIngredients[index].expanded;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      id: ingredients.length + 1,
      expanded: true,
      name: "",
      unit: "",
      standardPortion: "",
      quantity: "",
      preparationType: "",
    };
    setIngredients([...ingredients, newIngredient]);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add New Dish
        </Typography>
        <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="dishname"
            label="Dish Name"
            name="dishname"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="dishPrice" // Change to "dishPrice"
            label="Dish Price"
            id="dishprice"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Upload Image - to be changed to image"
            name="image"
          />
          {ingredients.map((ingredient, index) => (
            <Accordion
              key={ingredient.id}
              expanded={ingredient.expanded}
              onChange={handleAccordionClick(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${ingredient.id}-content`}
                id={`panel-${ingredient.id}-header`}
              >
                <Typography>Ingredient {ingredient.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={`ingredientname${index}`}
                  label="Ingredient Name"
                  name={`ingredientname${index}`}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={`unit${index}`}
                  label="Unit of Measurement"
                  name={`unit${index}`}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={`standardportion${index}`}
                  label="Standard Portion"
                  name={`standardportion${index}`}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={`quantity${index}`}
                  label="Quantity"
                  name={`quantity${index}`}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={`preparationtype${index}`}
                  label="Preparation Type"
                  name={`preparationtype${index}`}
                />
              </AccordionDetails>
            </Accordion>
          ))}

          <Button
            type="button"
            onClick={handleAddIngredient}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add More Ingredients
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            to="/vendormenu"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Dish
          </Button>
          <Grid container></Grid>
        </form>
      </Box>
    </Container>
  );
}
