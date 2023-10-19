import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function DishCard({ dish, onEdit, onDelete }) {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "5px",
        marginBottom: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <img src={dish.thumbnail} alt={dish.name} style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1">{dish.name}</Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Typography variant="subtitle1">
            {dish.quantity} x $
            {typeof dish.price === "number" ? dish.price.toFixed(2) : "ERROR"}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">
            $
            {typeof (dish.quantity * dish.price) === "number"
              ? (dish.quantity * dish.price).toFixed(2)
              : "ERROR"}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton size="small" onClick={() => onEdit(dish)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(dish.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}
function useCart() {
  const [cart, setCart] = useState([]);

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  const updateItem = (id, updatedDish) =>
    setCart(cart.map((item) => (item.id === id ? updatedDish : item)));

  const addItem = (dish) => {
    const existingDish = cart.find((item) => item.id === dish.id);
    setCart(
      existingDish
        ? cart.map((item) =>
            item.id === dish.id
              ? { ...item, quantity: item.quantity + dish.quantity }
              : item
          )
        : [...cart, dish]
    );
  };

  const getTotalPrice = () =>
    cart.reduce((acc, dish) => acc + dish.price * dish.quantity, 0);

  return { cart, removeItem, updateItem, addItem, getTotalPrice };
}
export default function Cart() {
  const { cart, removeItem, updateItem, getTotalPrice } = useCart();
  const cartTotal = getTotalPrice();
  const serviceFees = 0.1 * cartTotal;
  const total = cartTotal + serviceFees;

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingDishId, setDeletingDishId] = useState(null);

  const handleDeleteRequest = (id) => {
    setDeletingDishId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = (id) => removeItem(id);

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setNewQuantity(dish.quantity);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (editingDish) {
      updateItem(editingDish.id, { ...editingDish, quantity: newQuantity });
      setEditModalOpen(false);
      setEditingDish(null);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5" gutterBottom>
          My Cart
        </Typography>
        <Divider />

        <Typography variant="h6" mt={2} mb={2}>
          Dish Summary
        </Typography>

        <List sx={{ width: "100%" }}>
          {cart.length ? (
            cart.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onEdit={handleEdit}
                onDelete={handleDeleteRequest}
              />
            ))
          ) : (
            <Typography variant="subtitle1" color="textSecondary">
              Your cart is empty. Continue shopping?
            </Typography>
          )}
        </List>

        <Box
          sx={{
            width: { xs: "100%", sm: "50%" },
            height: { xs: "100%", sm: "auto" },
          }}
        >
          <ListItem>
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">Service Fees</Typography>
              <Typography variant="subtitle1">
                ${serviceFees.toFixed(2)}
              </Typography>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container justifyContent="space-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">${total.toFixed(2)}</Typography>
            </Grid>
          </ListItem>
        </Box>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to={{
            pathname: `/`,
          }}
        >
          Order more?
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          component={Link}
          to={{
            pathname: "/receipt",
            state: { cartData: cart },
          }}
        >
          Check Out
        </Button>

        {isEditModalOpen && (
          <Dialog
            open={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
          >
            <DialogTitle>Edit Dish</DialogTitle>
            <DialogContent>
              <TextField
                label="Quantity"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                value={newQuantity}
                onChange={(e) =>
                  setNewQuantity(Math.max(1, Number(e.target.value)))
                }
                variant="outlined"
                fullWidth
                size="small"
              />
            </DialogContent>
            <DialogActions>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Container>
  );
}
