from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import conn
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


@app.get("/veronica-api")
def veronicar():

    return "Hi, I'm a car"


@app.get("/stores-menu-items")
def read_stores_menu_items():
    cursor = conn.cursor()
    query = """
    SELECT stores.store_id, store_name, item_id, item_name, description, price
    FROM stores, menu_items
    WHERE stores.store_id=menu_items.store_id
    ORDER BY store_name, item_name
    """  # add image_path
    cursor.execute(query)
    record = cursor.fetchall()
    cursor.close()
    if record is None:
        raise HTTPException(
            status_code=404, detail="stores-menu-items not found")
    return transform_stores_menu_items(record)


@app.get("/menu-item/{item_id}")
def read_menu_item(item_id: int):
    cursor = conn.cursor()
    query = """
    SELECT item_id, item_name, description, price
    FROM menu_items
    WHERE item_id=%s
    """  # add image_path
    cursor.execute(query, (item_id,))
    record = cursor.fetchone()
    cursor.close()
    if record is None:
        raise HTTPException(
            status_code=404, detail="stores-menu-items not found")
    return transform_menu_item(record)


@app.get("/order-item/{order_item_id}")
def read_order_item(order_item_id: int):
    cursor = conn.cursor()
    query = "SELECT order_item_id, order_id, item_id, quantity, subtotal FROM order_items WHERE order_item_id=%s"
    cursor.execute(query, (order_item_id,))
    record = cursor.fetchone()
    cursor.close()
    if record is None:
        raise HTTPException(status_code=404, detail="Order item not found")
    return {"order_item_id": record[0], "order_id": record[1], "item_id": record[2], "quantity": record[3], "subtotal": record[4]}


if __name__ == "__main__":

    import uvicorn
    uvicorn.run(app, host="localhost", port=8600)
