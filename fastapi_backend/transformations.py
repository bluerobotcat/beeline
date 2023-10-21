### CUSTOMER BUSINESS LOGIC ###

def transform_all_dishes(ip):

    if len(ip) == 0:
        return []

    op = []

    curr_store_id = ip[0][0]
    curr_items = []

    for i in range(len(ip)):
        if curr_store_id != ip[i][0]:
            op.append({
                'storeName': ip[i-1][1],
                'dishes': curr_items
            })
            curr_store_id = ip[i][0]
            curr_items = []
        curr_items.append({
            'dishId': ip[i][2],
            'dishName': ip[i][3],
            'dishDescription': ip[i][4],
            'dishPrice': ip[i][5],
            'dishImgPath': ip[i][6],
        })

    op.append({
        'storeName': ip[-1][1],
        'dishes': curr_items
    })

    return op


def transform_dish_item(ip):
    return {
        'dishId': ip[0],
        'dishName': ip[1],
        'dishDescription': ip[2],
        'dishPrice': ip[3],
        'dishImgPath': ip[4]
    }


def transform_customer_order_count(ip):
    return {
        'totalQty': (0 if ip[0] is None else ip[0])
    }


def transform_customer_order(ip):

    if len(ip) == 0:
        return {
            'orderId': 0,
            'orderItems': [],
            'orderTotal': 0.00
        }

    dishes, total = [], 0

    for i in range(len(ip)):
        total = total + (ip[i][5] + ip[i][8]) * ip[i][6]
        dishes.append({
            'orderItemId': ip[i][1],
            'dishId': ip[i][2],
            'dishName': ip[i][3],
            'dishImgPath': ip[i][4],
            'dishPrice': ip[i][5],
            'orderItemQty': ip[i][6],
            'orderModifier': ip[i][7],
            'orderSurcharge': ip[i][8]
        })

    return {
        'orderId': ip[0][0],
        'orderItems': dishes,
        'orderTotal': total
    }


def transform_receipt(ip):

    if len(ip) == 0:
        return {
            'orderId': 0,
            'orderDate': '',
            'orderTime': '',
            'orderType': '',
            'paymentType': '',
            'orderTotal': 0.00,
            'orderItems': []
        }

    dishes = []

    for i in range(len(ip)):
        dishes.append({
            'dishName': ip[i][5],
            'dishPrice': ip[i][6],
            'orderItemQty': ip[i][7],
            'orderModifier': ip[i][8],
            'orderSurcharge': ip[i][9]
        })

    return {
        'orderId': ip[0][0],
        'orderDate': ip[0][1].strftime('%d-%m-%Y'),
        'orderTime': ip[0][1].strftime('%H:%M:%S'),
        'orderType': ip[0][2],
        'paymentType': ip[0][3],
        'orderTotal': ip[0][4],
        'orderItems': dishes
    }


### VENDOR BUSINESS LOGIC ###

def transform_store_orders(ip):

    if len(ip) == 0:
        return {
            'storeId': 0,
            'orders': []
        }

    orders = []

    curr_order_id = ip[0][1]
    curr_items = []

    for i in range(len(ip)):
        if curr_order_id != ip[i][1]:
            orders.append({
                'orderId': ip[i-1][1],
                'orderStatus': ip[i-1][2],
                'orderDateTime': ip[i-1][3].strftime('%Y-%m-%dT%H:%M:%S'),
                'customerName': ip[i-1][4],
                'orderType': ip[i-1][5],
                'paymentType': ip[i-1][6],
                'dishes': curr_items
            })
            curr_order_id = ip[i][1]
            curr_items = []
        curr_items.append({
            'dishName': ip[i][7],
            'orderItemQty': ip[i][8],
            'orderModifier': ip[i][9],
        })

    orders.append({
        'orderId': ip[-1][1],
        'orderStatus': ip[-1][2],
        'orderDateTime': ip[-1][3].strftime('%d-%m-%YT%H:%M:%S'),
        'customerName': ip[-1][4],
        'orderType': ip[-1][5],
        'paymentType': ip[-1][6],
        'dishes': curr_items
    })

    return {
        'storeId': ip[0][0],
        'orders': orders
    }
