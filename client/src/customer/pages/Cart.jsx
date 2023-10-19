import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "./CartProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

import { ORDER_ID_SESSION } from "./SessionID";

function DishCard({ dish, onEdit, onDelete }) {
  return (
    <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: "5px", mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <img
            src={`${process.env.PUBLIC_URL}/images/${dish.dishImgPath}`}
            alt={dish.dishName}
            style={{ width: "100%", borderRadius: "5px" }}
          />
        </Grid>
        <Grid item xs={5} sm={7}>
          <Typography variant="subtitle1">
            <b>{dish.dishName}</b>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            ID: {dish.dishId} <br />
            Modifiers/Add-ons:{" "}
            {dish.orderModifier ? dish.orderModifier : "None"}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Typography variant="subtitle1">
            {dish.orderItemQty} x $
            {(dish.dishPrice + dish.orderSurcharge).toFixed(2)}
          </Typography>
        </Grid>
        {/*
          <Grid item xs={9}>
          <Typography variant="subtitle1">
            Subtotal: $
            {(
              dish.orderItemQty *
              (dish.dishPrice + dish.orderSurcharge)
            ).toFixed(2)}
          </Typography>
          </Grid>
        */}
        {/*
          <Grid item xs={3}>
            <IconButton size="small" onClick={() => onEdit(dish)} color="primary">
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onDelete(dish.id)}
              color="secondary"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Grid>
        */}
      </Grid>
    </Box>
  );
}

export default function Cart() {
  const { cart, removeItem, updateItem } = useCart();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  // fetch cart items from API
  const [data, setData] = useState({
    orderId: ORDER_ID_SESSION,
    orderItems: [],
    orderTotal: 0.0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8600/customer-order/${ORDER_ID_SESSION}`)
      .then((response) => {
        setData(response.data);
        console.log("cart data is:", response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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

  const cartTotal = data.orderTotal;
  const serviceFees = 0.1 * cartTotal;
  const total = cartTotal + serviceFees;

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingDishId, setDeletingDishId] = useState(null);

  const handleDeleteRequest = (id) => {
    setDeletingDishId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h5">
              My Cart
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" mt={2} mb={2}>
          Dish Summary
        </Typography>
        <List sx={{ width: "100%" }}>
          {data.orderItems.length ? (
            data.orderItems.map((dish) => (
              <DishCard
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
        <Box sx={{ mt: 3 }}>
          <ListItem>
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">Subtotal</Typography>
              <Typography variant="subtitle1">
                ${cartTotal.toFixed(2)}
              </Typography>
            </Grid>
          </ListItem>
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
        <Box sx={{ mt: 4, textAlign: "center", minWidth: 300 }}>
          <Tooltip title="Add more dishes to your cart">
            <Button
              component={Link}
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<ShoppingCartIcon />}
              to="/"
              sx={{ mr: 2 }}
            >
              Order more
            </Button>
          </Tooltip>
          <Tooltip title="Proceed to payment">
            <Button
              component={Link}
              variant="contained"
              color="primary"
              size="large"
              to={{ pathname: "/receipt", state: { cartData: cart } }}
            >
              Check Out
            </Button>
          </Tooltip>
        </Box>
        {isEditModalOpen && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              bgcolor: "white",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" align="center" mb={2}>
              Edit Dish
            </Typography>
            <TextField
              label="Quantity"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              // value={newQuantity}
              // onChange={(e) => setNewQuantity(e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
            />
            <Grid container spacing={2} mt={2}>
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
          </Box>
        )}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this dish from the cart?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete(deletingDishId);
                setDeleteDialogOpen(false);
              }}
              color="primary"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
