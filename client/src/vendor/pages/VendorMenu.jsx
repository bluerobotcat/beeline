import React from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import food1 from "../images/food1.jpg";

export default function VendorMenu() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dishToRemove, setDishToRemove] = React.useState(null);
  const [selectedDish, setSelectedDish] = React.useState(null);

  const navigate = useNavigate();

  const initialStores = [
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
  ];

  const [stores, setStores] = React.useState(initialStores); // initialStores is your original stores data

  const handleRemoveDish = (storeIndex, dishIndex) => {
    setDishToRemove({ storeIndex, dishIndex });
    setOpenDialog(true);
  };

  const confirmRemoveDish = () => {
    const newStores = [...stores];
    newStores[dishToRemove.storeIndex].dishes.splice(dishToRemove.dishIndex, 1);
    setStores(newStores);
    setOpenDialog(false);
    setDishToRemove(null);
  };

  const handleEditDish = (dish) => {
    setSelectedDish(dish);
  };

  const updateDish = (updatedDish) => {
    setStores((prevStores) => {
      const updatedStores = [...prevStores];
      for (let store of updatedStores) {
        const dishIndex = store.dishes.findIndex((d) => d === selectedDish);
        if (dishIndex !== -1) {
          store.dishes[dishIndex] = updatedDish;
          break;
        }
      }
      return updatedStores;
    });
    setSelectedDish(null); // Close the edit form after updating
  };

  return (
    <>
      <Container maxWidth="md">
        {selectedDish ? (
          <EditDish dish={selectedDish} onUpdate={updateDish} />
        ) : (
          <Box my={4}>
            <Typography
              variant="h3"
              color="primary"
              gutterBottom
              sx={{ textAlign: "center" }}
            >
              MENU MANAGEMENT
            </Typography>
            <Box mt={6} mb={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/vendoraddnewdish"
                    color="secondary"
                    fullWidth
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Add New Dish
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              {stores.map((store, idx) => (
                <MenuItem
                  key={idx}
                  store={store}
                  storeIndex={idx}
                  handleEditDish={handleEditDish}
                  handleRemoveDish={handleRemoveDish}
                />
              ))}
            </Box>
          </Box>
        )}
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Removal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the dish?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmRemoveDish} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function MenuItem({ store, storeIndex, handleEditDish, handleRemoveDish }) {
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
        {store.dishes.map((dish, idx) => (
          <Grid key={idx} item xs={isMobile ? 6 : 4} md={3}>
            <DishCard
              dish={dish}
              onEdit={handleEditDish}
              onRemove={() => handleRemoveDish(storeIndex, idx)}
            />
          </Grid>
        ))}
      </Grid>
    </Accordion>
  );
}

function DishCard({ dish, onRemove, onEdit }) {
  return (
    <Card sx={{ maxWidth: 280, margin: "auto", marginBottom: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={dish.image}
          alt={dish.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{ marginBottom: 2 }}>
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
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => onEdit(dish)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={onRemove}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
function EditDish({ dish, onUpdate }) {
  const [editedDish, setEditedDish] = React.useState(dish);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDish((prevDish) => ({
      ...prevDish,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(editedDish);
  };

  return (
    <Container
      maxWidth="sm"
      component={Paper}
      style={{ padding: "20px", marginTop: "20px" }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Dish
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Dish Name"
        name="name"
        value={editedDish.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={editedDish.description}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Base Price"
        name="basePrice"
        value={editedDish.basePrice}
        onChange={handleInputChange}
        type="number"
      />
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update Dish
        </Button>
      </Box>
    </Container>
  );
}
