from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

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

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="@1234567",
    database="beeline"
)

# Pydantic model to define the schema of the order items


class OrderItem(BaseModel):
    order_item_id: int = None
    order_id: int
    item_id: int
    quantity: int
    subtotal: float


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/order-items/", response_model=OrderItem)
def create_order_item(order_item: OrderItem):
    cursor = conn.cursor()
    query = "INSERT INTO order_items (order_id, item_id, quantity, subtotal) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (order_item.order_id, order_item.item_id,
                           order_item.quantity, order_item.subtotal))
    conn.commit()
    order_item.order_item_id = cursor.lastrowid
    cursor.close()
    return order_item


@app.get("/order-items/{order_item_id}", response_model=OrderItem)
def read_order_item(order_item_id: int):
    cursor = conn.cursor()
    query = "SELECT order_item_id, order_id, item_id, quantity, subtotal FROM order_items WHERE order_item_id=%s"
    cursor.execute(query, (order_item_id,))
    record = cursor.fetchone()
    cursor.close()
    if record is None:
        raise HTTPException(status_code=404, detail="Order item not found")
    return {"order_item_id": record[0], "order_id": record[1], "item_id": record[2], "quantity": record[3], "subtotal": record[4]}


@app.put("/order-items/{order_item_id}", response_model=OrderItem)
def update_order_item(order_item_id: int, order_item: OrderItem):
    cursor = conn.cursor()
    query = """UPDATE order_items SET order_id=%s, item_id=%s, quantity=%s, subtotal=%s WHERE order_item_id=%s"""
    cursor.execute(query, (order_item.order_id, order_item.item_id,
                           order_item.quantity, order_item.subtotal, order_item_id))
    conn.commit()
    cursor.close()
    order_item.order_item_id = order_item_id
    return order_item


@app.delete("/order-items/{order_item_id}", response_model=OrderItem)
def delete_order_item(order_item_id: int):
    cursor = conn.cursor()
    # First fetch the order item to be deleted for the response model
    query = "SELECT order_item_id, order_id, item_id, quantity, subtotal FROM order_items WHERE order_item_id=%s"
    cursor.execute(query, (order_item_id,))
    record = cursor.fetchone()
    if record is None:
        cursor.close()
        raise HTTPException(status_code=404, detail="Order item not found")
    # Then delete the order item
    query = "DELETE FROM order_items WHERE order_item_id=%s"
    cursor.execute(query, (order_item_id,))
    conn.commit()
    cursor.close()
    return {
        "order_item_id": record[0],
        "order_id": record[1],
        "item_id": record[2],
        "quantity": record[3],
        "subtotal": record[4]
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8600)
