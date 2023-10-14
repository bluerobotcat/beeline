

def transform_stores_menu_items(ip):
    """
    [ (stores.store_id, store_name, item_id, item_name, description, price),
      (stores.store_id, store_name, item_id, item_name, description, price),
      ...]

    {'store_name': [..., ...], 'item_id': [..., ...]}

    [{'store_name': store1, 'items': [{'item_name': ..., <item-details>}]},
    {'store_name': store2, 'items': [{'item_name': ..., <item-details>}]}]
    'items' contains a list of the item details
    """

    op = []

    curr_store_id = ip[0][0]
    curr_items = []

    for i in range(len(ip)):
        if curr_store_id != ip[i][0]:
            op.append({
                'name': ip[i][1],
                'dishes': curr_items
            })
            curr_store_id = ip[i][0]
            curr_items = []
        curr_items.append({
            'item_id': ip[i][2],
            'name': ip[i][3],
            'description': ip[i][4],
            'basePrice': ip[i][5],
            # needs a url path, perhaps add a image get method at fastapi
            'image': 'food1.jpg',
        })
        # print([f"{curr_store_id},{x['item_id']}" for x in curr_items])

    op.append({
        'name': ip[-1][1],
        'dishes': curr_items
    })

    return op


def transform_menu_item(ip):
    return {'item_id': ip[0], 'item_name': ip[1], 'description': ip[2], 'price': ip[3]}
