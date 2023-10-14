import React, { useEffect, useState } from "react";
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
//import { stores } from "../../data";
import axios from "axios";

// import { fetchStoresDishes } from "../../database/queryDatabase";
// console.log(fetchStoresDishes());

export default function Menu() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8600/stores-menu-items")
      .then((response) => {
        setData(response.data);
        console.log("This is our experiment lmfao");
        console.log(response); // Use response.data instead of response.body
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;
  return (
    <div>
      {data.map((store, index) => (
        <>
          <MenuItem store={store} />
          {index !== data.length - 1 && <Divider />}
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
  console.log(`${process.env.PUBLIC_URL}/images/${dish.image}`);
  return (
    <Card sx={{ maxWidth: 280, margin: "auto" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${process.env.PUBLIC_URL}/images/${dish.image}`}
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
              pathname: `/dishselection/${dish.item_id}`,
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
