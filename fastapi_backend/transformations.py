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
                'storeName': ip[i][1],
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
    return {'dishId': ip[0], 'dishName': ip[1], 'dishDescription': ip[2], 'dishPrice': ip[3], 'dishImgPath': ip[4]}


def transform_customer_order(ip):
    '''
    {
        'orderId': 1,
        'dishes': [{...}, {...}],
        'orderTotal': 0.00
    }
    '''

    if len(ip) == 0:
        return {'orderId': ip[0][0], 'orderItems': [], 'orderTotal': 0.00}

    dishes, total = [], 0

    for i in range(len(ip)):
        total = total + (ip[i][4] + ip[i][7]) * ip[i][5]
        dishes.append({
            'orderItemId': ip[i][1],
            'dishId': ip[i][2],
            'dishName': ip[i][3],
            'dishPrice': ip[i][4],
            'orderItemQty': ip[i][5],
            'orderModifier': ip[i][6],
            'orderSurcharge': ip[i][7]
        })

    return {'orderId': ip[0][0], 'orderItems': dishes, 'orderTotal': total}


### VENDOR BUSINESS LOGIC ###
