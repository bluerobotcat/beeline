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


def get_order_id_by_customer_id(customerId):
    cursor = conn.cursor()
    query = """
    SELECT orderId
    FROM customerorder
    WHERE customerorder.customerId=%s AND customerorder.orderStatus=%s
    """
    cursor.execute(query, (customerId, 'Unsubmitted'))
    record = cursor.fetchone()
    cursor.close()
    return record[0]


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


class PostOrderItem(BaseModel):
    customerId: int
    dishId: int
    orderItemQty: int
    orderModifier: str
    orderSurcharge: float


@app.post("/order-item")
def post_order_item(data: PostOrderItem):
    # Expect json keys: orderId, dishId, orderItemQty
    orderId = get_order_id_by_customer_id(data.customerId)
    cursor = conn.cursor()
    query = """
    INSERT INTO orderitem (orderId, dishId, orderItemQty, orderModifier, orderSurcharge)
    VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (orderId, data.dishId,
                   data.orderItemQty, data.orderModifier, data.orderSurcharge))
    conn.commit()
    cursor.close()
    return SUCCESS_MESSAGE


class PutOrderItem(BaseModel):
    orderItemId: int
    orderItemQty: int


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


@app.get("/customer-order/{customerId}")
def get_customer_order_by_id(customerId: int):
    # Expects customerId at endpoint
    cursor = conn.cursor()
    query = """
    SELECT customerorder.orderId, orderItemId, dish.dishId, dishName, dishImgPath, dishPrice, orderItemQty, orderModifier, orderSurcharge
    FROM customerorder, orderitem, dish
    WHERE customerorder.customerId=%s AND customerorder.orderStatus=%s AND customerorder.orderId=orderitem.orderId AND orderitem.dishId=dish.dishId 
    ORDER BY dishName
    """
    cursor.execute(query, (customerId, 'Unsubmitted'))
    record = cursor.fetchall()
    cursor.close()
    check_data(record, 'cart is empty')
    return transform_customer_order(record)


@app.get("/customer-order-count/{customerId}")
def get_customer_order_count(customerId: int):
    # Expects customerId at endpoint
    orderId = get_order_id_by_customer_id(customerId)
    cursor = conn.cursor()
    query = """
    SELECT SUM(orderItemQty)
    FROM orderitem
    WHERE orderId=%s
    """
    cursor.execute(query, (orderId,))
    record = cursor.fetchone()
    cursor.close()
    return transform_customer_order_count(record)


class PutSubmitOrder(BaseModel):
    orderId: int
    customerId: int
    orderType: str
    paymentType: str
    orderDateTime: str


@app.put("/submit-order")
def update_order_item(data: PutSubmitOrder):
    # Expect json keys: customerId, orderType, paymentType, orderDateTime
    orderTotal = get_customer_order_by_id(data.customerId)['orderTotal']
    correctedDateTime = data.orderDateTime[:10] + \
        ' ' + data.orderDateTime[11:19]
    cursor = conn.cursor()
    query = """
    UPDATE customerorder
    SET orderStatus=%s, orderType=%s, paymentType=%s, orderTotal=%s, orderDateTime=%s
    WHERE orderId=%s
    """
    cursor.execute(query, ('Pending', data.orderType, data.paymentType,
                   orderTotal, correctedDateTime, data.orderId))
    conn.commit()
    query = """
    INSERT INTO customerorder (customerId, orderStatus)
    VALUES (%s, %s)
    """
    cursor.execute(query, (data.customerId, 'Unsubmitted'))
    record = cursor.fetchone()
    conn.commit()
    cursor.close()
    return SUCCESS_MESSAGE


@app.get("/receipt/{orderId}")
def get_receipt_by_id(orderId: int):
    # Expects orderId at endpoint
    cursor = conn.cursor()
    query = """
    SELECT customerorder.orderId, orderDateTime, orderType, paymentType, orderTotal, dishName, dishPrice, orderItemQty, orderModifier, orderSurcharge
    FROM customerorder, orderitem, dish
    WHERE orderitem.orderId=%s AND customerorder.orderId=orderitem.orderId AND orderitem.dishId=dish.dishId 
    ORDER BY dishName
    """
    cursor.execute(query, (orderId,))
    record = cursor.fetchall()
    cursor.close()
    check_data(record, 'cart is empty')
    return transform_receipt(record)


### VENDOR APIS ###


@app.get("/view-orders/{storeId}")
def get_store_orders_by_id(storeId: int):
    # Expects storeId at endpoint
    cursor = conn.cursor()
    query = """
    SELECT dish.storeId, customerorder.orderId, orderStatus, orderDateTime, customerName, orderType, paymentType, dishName, orderItemQty, orderModifier
    FROM customerorder, customer, orderitem, dish
    WHERE dish.storeId=%s AND orderStatus IN ('Pending', 'Completed')
        AND customerorder.customerId=customer.customerId AND customerorder.orderId=orderitem.orderId AND orderitem.dishId=dish.dishId
    ORDER BY orderStatus, orderDateTime, customerName, dishName
    """
    cursor.execute(query, (storeId,))
    record = cursor.fetchall()
    cursor.close()
    check_data(record, 'cart is empty')
    return transform_store_orders(record)


### DEVELOPMENT APIS ###

@app.get("/dev/add-customer/{customerId}")
def dev_add_customer(customerId: int):
    # Expects customerId at endpoint
    cursor = conn.cursor()
    query = """
    INSERT INTO customerorder (customerId, orderStatus)
    VALUES (%s, %s)
    """
    cursor.execute(query, (customerId, 'Unsubmitted'))
    record = cursor.fetchone()
    conn.commit()
    cursor.close()
    return SUCCESS_MESSAGE


if __name__ == "__main__":

    import uvicorn
    uvicorn.run(app, host="localhost", port=8600)
