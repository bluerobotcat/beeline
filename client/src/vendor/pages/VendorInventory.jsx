import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
} from "@mui/material";

const initialInventoryData = [
  {
    ingredient: "Ingredient A",
    description: "100g of Kampung Chicken",
    quantity: 1,
    image: "https://via.placeholder.com/50",
    minThreshold: 0,
    maxThreshold: 10,
  },
  {
    ingredient: "Ingredient B",
    description: "20 kg Jasmine Fragrant Rice",
    quantity: 8,
    image: "https://via.placeholder.com/50",
    minThreshold: 0,
    maxThreshold: 10,
  },
  {
    ingredient: "Ingredient C",
    description: "30’s Eggs",
    quantity: 10,
    image: "https://via.placeholder.com/50",
    minThreshold: 0,
    maxThreshold: 10,
  },
  {
    ingredient: "Ingredient D",
    description: "Xiao Bai Cai",
    quantity: 15,
    image: "https://via.placeholder.com/50",
    minThreshold: 0,
    maxThreshold: 10,
  },
  {
    ingredient: "Ingredient E",
    description: "xxx xxxx",
    quantity: 15,
    image: "https://via.placeholder.com/50",
    minThreshold: 0,
    maxThreshold: 10,
  },
];

export default function VendorInventory() {
  const [inventoryList, setInventoryList] = useState(initialInventoryData);
  const [editMode, setEditMode] = useState(false);
  const [showThreshold, setShowThreshold] = useState(false);
  const [addNewMode, setAddNewMode] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    ingredient: "",
    description: "",
    quantity: 0,
    image: "https://via.placeholder.com/50",
    minThreshold: 0,
    maxThreshold: 10,
  });

  const handleRemove = (index) => {
    if (editMode) {
      const updatedInventory = [...inventoryList];
      updatedInventory.splice(index, 1);
      setInventoryList(updatedInventory);
    }
  };

  const handleAdd = () => {
    if (newIngredient.ingredient && newIngredient.description && addNewMode) {
      setInventoryList([
        ...inventoryList,
        { ...newIngredient, minThreshold: 0, maxThreshold: 10 },
      ]);
      setNewIngredient({
        ingredient: "",
        description: "",
        quantity: 0,
        image: "https://via.placeholder.com/50",
        minThreshold: 0, // Updated to minThreshold
        maxThreshold: 10, // Updated to maxThreshold
      });
      setAddNewMode(false);
    }
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setShowThreshold(false);
    setAddNewMode(false); // close add new mode when toggling edit mode
  };

  const handleToggleShowThreshold = () => {
    setShowThreshold(!showThreshold);
    setEditMode(false);
    setAddNewMode(false); // close add new mode when toggling show threshold
  };

  const handleToggleAddNewMode = () => {
    setAddNewMode(!addNewMode);
    setShowThreshold(false);
    setEditMode(false); // close edit mode when toggling add new mode
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" color="primary" gutterBottom>
          INVENTORY
        </Typography>

        <InventoryActions
          handleToggleEditMode={handleToggleEditMode}
          handleToggleShowThreshold={handleToggleShowThreshold}
          handleToggleAddNewMode={handleToggleAddNewMode}
          editMode={editMode}
          showThreshold={showThreshold}
          addNewMode={addNewMode}
        />

        {addNewMode && (
          <AddIngredientForm
            handleAdd={handleAdd}
            newIngredient={newIngredient}
            setNewIngredient={setNewIngredient}
          />
        )}

        <InventoryList
          inventoryList={inventoryList}
          showThreshold={showThreshold}
          editMode={editMode}
          handleRemove={handleRemove}
          setInventoryList={setInventoryList}
        />
      </Box>
    </Container>
  );
}

function InventoryActions({
  handleToggleEditMode,
  handleToggleShowThreshold,
  handleToggleAddNewMode,
  editMode,
  showThreshold,
  addNewMode,
}) {
  return (
    <Box mt={4} display="flex" justifyContent="center" flexWrap="wrap">
      <Button
        variant="contained"
        size="large"
        onClick={handleToggleEditMode}
        color={editMode ? "primary" : "secondary"}
        sx={{ margin: "8px", width: "30%" }}
      >
        Edit Inventory
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={handleToggleShowThreshold}
        color={showThreshold ? "primary" : "secondary"}
        sx={{ margin: "8px", width: "30%" }}
      >
        Set Threshold
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={handleToggleAddNewMode}
        color={addNewMode ? "primary" : "secondary"}
        sx={{ margin: "8px", width: "30%" }}
      >
        Add New Ingredient
      </Button>
    </Box>
  );
}

function AddIngredientForm({ handleAdd, newIngredient, setNewIngredient }) {
  // You can add any additional logic specific to this form here
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Add New Ingredient
      </Typography>
      <TextField
        label="Ingredient Name"
        value={newIngredient.ingredient}
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            ingredient: e.target.value,
          })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={newIngredient.description}
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            description: e.target.value,
          })
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        value={newIngredient.quantity}
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            quantity: parseInt(e.target.value, 10),
          })
        }
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Min Threshold"
        value={newIngredient.minThreshold}
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            minThreshold: parseInt(e.target.value, 10),
          })
        }
        type="number"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Max Threshold"
        value={newIngredient.maxThreshold}
        onChange={(e) =>
          setNewIngredient({
            ...newIngredient,
            maxThreshold: parseInt(e.target.value, 10),
          })
        }
        type="number"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAdd} fullWidth>
        Add to Inventory
      </Button>
    </Box>
  );
}
function InventoryList({
  inventoryList,
  showThreshold,
  editMode,
  handleRemove,
  setInventoryList,
}) {
  return (
    <Box mt={4}>
      <List>
        {inventoryList.map((item, index) => (
          <IngredientItem
            key={index}
            item={item}
            index={index}
            showThreshold={showThreshold}
            editMode={editMode}
            handleRemove={handleRemove}
            setInventoryList={setInventoryList}
            inventoryList={inventoryList}
          />
        ))}
      </List>
    </Box>
  );
}

function IngredientItem({
  item,
  index,
  showThreshold,
  editMode,
  handleRemove,
  setInventoryList,
  inventoryList,
}) {
  const isAboveThreshold = item.quantity > item.maxThreshold;
  const isBelowThreshold = item.quantity < item.minThreshold;

  const handleThresholdChange = (field, value) => {
    const updatedList = [...inventoryList];
    updatedList[index][field] = parseInt(value, 10);
    setInventoryList(updatedList);
  };

  return (
    <React.Fragment key={index}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={item.ingredient} src={item.image} />
        </ListItemAvatar>
        <ListItemText primary={item.ingredient} secondary={item.description} />

        {showThreshold && (
          <React.Fragment>
            <TextField
              label="Min Threshold"
              value={item.minThreshold}
              onChange={(e) =>
                handleThresholdChange("minThreshold", e.target.value)
              }
              type="number"
              inputProps={{ min: 0 }}
              variant="outlined"
              size="small"
              sx={{ width: "100px", marginRight: "16px" }}
            />
            <TextField
              label="Max Threshold"
              value={item.maxThreshold}
              onChange={(e) =>
                handleThresholdChange("maxThreshold", e.target.value)
              }
              type="number"
              inputProps={{ min: 0 }}
              variant="outlined"
              size="small"
              sx={{ width: "100px", marginRight: "16px" }}
            />
          </React.Fragment>
        )}
        {editMode ? (
          <React.Fragment>
            <TextField
              value={item.quantity}
              onChange={(e) => {
                const updatedList = [...inventoryList];
                updatedList[index].quantity = parseInt(e.target.value, 10);
                setInventoryList(updatedList);
              }}
              type="number"
              inputProps={{ min: 0 }}
              variant="outlined"
              size="small"
              sx={{ width: "70px", marginRight: "16px" }}
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </React.Fragment>
        ) : (
          <Typography variant="h6" fontWeight="bold">
            {item.quantity}
          </Typography>
        )}
      </ListItem>

      {/* Prompts for actions */}
      {isAboveThreshold && (
        <Box mt={2} p={2} bgcolor="rgba(255, 235, 59, 0.1)" borderRadius={2}>
          <Typography variant="body1" color="warning" gutterBottom>
            Too many {item.ingredient}. Consider:
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" color="primary">
              Donate
            </Button>
            <Button variant="outlined" color="primary">
              Recycle
            </Button>
            <Button variant="outlined" color="primary">
              Dispose
            </Button>
          </Box>
        </Box>
      )}
      {isBelowThreshold && (
        <Box mt={2} p={2} bgcolor="rgba(244, 67, 54, 0.1)" borderRadius={2}>
          <Typography variant="body1" color="error" gutterBottom>
            Too few {item.ingredient}. Consider:
          </Typography>
          <Button variant="outlined" color="error">
            Order from Supplier
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
}
