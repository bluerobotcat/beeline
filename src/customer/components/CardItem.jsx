import * as React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import food1 from "../images/food1.jpg";

export default function DishCard() {
  return (
    <Card sx={{ display: "flex", maxWidth: 345, margin: "center" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={food1} alt="Dish A" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8} md={9}>
              <Typography gutterBottom variant="h5" component="div">
                Dish A
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This dish includes xxx and xxx for a fresh taste of local in the
                comfort of your home boundaries.
              </Typography>
            </Grid>
            <Grid item xs={4} md={3}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
              >
                <Typography variant="h6" color="text.secondary">
                  $3.50
                </Typography>
                <Button variant="contained">Add</Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
