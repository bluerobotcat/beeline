from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from database import conn
from template import *
from transformations import *


# Create the FastAPI application
app = FastAPI()

# Replace '*' with your frontend's domain when deploying to production
app.add_middleware(
    CORSMiddleware,
    # The URL of your React app during development
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    raise HTTPException(
        status_code=404, detail="Please use the correct API resource")


### CUSTOMER APIS ###

class PostOrderItem(BaseModel):
    orderItemId: int = None
    orderId: int
    dishId: int
    orderItemQty: int


class PutOrderItem(BaseModel):
    orderItemId: int
    orderItemQty: int


@app.get("/all-dishes")
def get_all_dishes():
    cursor = conn.cursor()
    query = """
    SELECT store.storeId, storeName, dishId, dishName, dishDescription, dishPrice, dishImgPath
    FROM store, dish
    WHERE store.storeId = dish.storeId
    ORDER BY storeName, dishName
    """
    cursor.execute(query)
    record = cursor.fetchall()
    cursor.close()
    check_data(record, 'no stores and dishes found')
    return transform_all_dishes(record)


@app.get("/dish/{dishId}")
def get_dish_by_id(dishId: int):
    # Expects dishId at endpoint
    cursor = conn.cursor()
    query = """
    SELECT dishId, dishName, dishDescription, dishPrice, dishImgPath
    FROM dish
    WHERE dishId=%s
    """
    cursor.execute(query, (dishId,))
    record = cursor.fetchone()
    cursor.close()
    check_data(record, f'dishId={dishId} not found')
    return transform_dish_item(record)


@app.post("/order-item")
def post_order_item(data: PostOrderItem):
    # Expect json keys: orderId, dishId, orderItemQty
    cursor = conn.cursor()
    query = "INSERT INTO orderitem (orderId, dishId, orderItemQty) VALUES (%s, %s, %s)"
    cursor.execute(query, (data.orderId, data.dishId, data.orderItemQty))
    conn.commit()
    cursor.close()
    return SUCCESS_MESSAGE


@app.put("/order-item")
def update_order_item(data: PutOrderItem):
    # Expect json keys: orderItemId, orderItemQty
    cursor = conn.cursor()
    query = "UPDATE orderitem SET orderItemQty=%s WHERE orderItemId=%s"
    cursor.execute(query, (data.orderItemQty, data.orderItemId))
    conn.commit()
    cursor.close()
    return SUCCESS_MESSAGE


@app.delete("/order-item/{orderItemId}")
def delete_order_item(orderItemId: int):
    # Expects orderItemId at endpoint
    cursor = conn.cursor()
    query = "DELETE FROM orderitem WHERE orderItemId=%s"
    cursor.execute(query, (orderItemId,))
    conn.commit()
    cursor.close()
    return SUCCESS_MESSAGE


@app.get("/customer-order/{orderId}")
def get_customer_order_by_id(orderId: int):
    # Expects orderId at endpoint
    cursor = conn.cursor()
    query = """
    SELECT customerorder.orderId, orderItemId, dish.dishId, dishName, dishPrice, orderItemQty
    FROM customerorder, orderitem, dish
    WHERE customerorder.orderId=%s AND customerorder.orderId=orderitem.orderId AND orderitem.dishId=dish.dishId 
    ORDER BY dishName
    """
    cursor.execute(query, (orderId,))
    record = cursor.fetchall()
    cursor.close()
    check_data(record, 'cart is empty')
    return transform_customer_order(record)


### VENDOR APIS ###
if __name__ == "__main__":

    import uvicorn
    uvicorn.run(app, host="localhost", port=8600)
