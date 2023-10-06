import React from "react";
import {
  Divider,
  Accordion,
  AccordionSummary,
  Stack,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import food1 from "../images/food1.jpg"; // Ensure you have this image in your project
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Menu({
  stores = [
    {
      name: "Store 1",
      dishes: [
        {
          name: "Chicken Rice",
          description: "This is Chicken Rice",
          image: food1,
          basePrice: 3.5,
        },
        {
          name: "Noodles",
          description: "This is Noodles",
          image: food1,
          basePrice: 4.0,
        },
        {
          name: "Chicken Rice",
          description: "This is Chicken Rice",
          image: food1,
          basePrice: 3.5,
        },
        {
          name: "Noodles",
          description: "This is Noodles",
          image: food1,
          basePrice: 4.0,
        },
        {
          name: "Chicken Rice",
          description: "This is Chicken Rice",
          image: food1,
          basePrice: 3.5,
        },
        {
          name: "Noodles",
          description: "This is Noodles",
          image: food1,
          basePrice: 4.0,
        },
      ],
    },
    {
      name: "Store 2",
      dishes: [
        {
          name: "Soup",
          description: "This is Soup",
          image: food1,
          basePrice: 5.0,
        },
        {
          name: "Chicken Rice",
          description: "This is Chicken Rice",
          image: food1,
          basePrice: 3.5,
        },
        {
          name: "Noodles",
          description: "This is Noodles",
          image: food1,
          basePrice: 4.0,
        },
      ],
    },
    {
      name: "Store 3",
      dishes: [
        {
          name: "Soup",
          description: "This is Soup",
          image: food1,
          basePrice: 5.0,
        },
        {
          name: "Chicken Rice",
          description: "This is Chicken Rice",
          image: food1,
          basePrice: 3.5,
        },
        {
          name: "Noodles",
          description: "This is Noodles",
          image: food1,
          basePrice: 4.0,
        },
      ],
    },
  ],
}) {
  return (
    <div>
      {stores.map((store, index) => (
        <>
          <MenuItem store={store} />
          {index !== stores.length - 1 && <Divider />}
        </>
      ))}
    </div>
  );
}
export function MenuItem({ store }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={store.name}
        id={store.name}
      >
        <Typography variant="h5">{store.name}</Typography>
      </AccordionSummary>
      <Grid container spacing={2}>
        {store.dishes.map((dish) => (
          <Grid item xs={isMobile ? 6 : 4} md={3}>
            <DishCard dish={dish} />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
}

export function DishCard({ dish }) {
  return (
    <Card sx={{ maxWidth: 280, margin: "auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={dish.image}
          alt={dish.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {dish.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            {dish.description}
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            ${dish.basePrice.toFixed(2)}
          </Typography>
          <Button
            component={Link}
            variant="contained"
            color="primary"
            to={{
              pathname: "/dishselection",
              state: { dish },
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
