import csv
from faker import Faker
from faker.providers import BaseProvider
import random
from datetime import datetime, timedelta

# Global Variables
fake = Faker()
used_emails = set()
used_store_names = set()
used_store_categories = set()
dish_descriptions = {
    "Hainanese Chicken Rice": "A fragrant and tender chicken dish served with flavorful rice and delicious chili sauce.",
    "Char Kway Teow": "Stir-fried flat rice noodles with prawns, eggs, and a sweet and savory sauce.",
    "Laksa": "A spicy noodle soup with a rich and creamy coconut broth, often made with seafood or chicken.",
    "Chilli Crab": "Crab cooked in a sweet and spicy tomato-based sauce, best enjoyed with mantou buns.",
    "Satay": "Skewered and grilled meat, typically served with a peanut sauce and rice cakes.",
    "Bak Kut Teh": "A flavorful pork rib soup made with a variety of herbs and spices.",
    "Hokkien Mee": "Stir-fried prawn and squid noodles with a rich seafood flavor.",
    "Nasi Lemak": "A fragrant rice dish cooked in coconut milk, served with sambal, anchovies, and peanuts.",
    "Rojak": "A mixed salad with a sweet and tangy sauce, often featuring fruits, vegetables, and tofu.",
    "Hainanese Beef Noodles": "A noodle soup with tender beef slices and a savory broth.",
}
ingredient_data = [
    ("Chicken", "pcs"),
    ("Flat rice noodles", "g"),
    ("Prawns", "g"),
    ("Crab", "g"),
    ("Meat", "g"),
    ("Pork ribs", "g"),
    ("Squid", "g"),
    ("Rice", "g"),
    ("Coconut milk", "ml"),
    ("Beef slices", "g")
]

random.shuffle(ingredient_data)
current_ingredient_id = 1
ingredient_data = [
    (current_ingredient_id, name, unit)
    for current_ingredient_id, (name, unit) in enumerate(ingredient_data, start=current_ingredient_id)
]

store_categories = [
    "Chinese",
    "Malay",
    "Indian",
    "Japanese",
    "Western",
    "Korean",
    "Thai",
    "Vietnamese",
    "Mexican",
    "Mediterranean",
    "Vegetarian",
    "Seafood",
]

store_names = [
    "Savory Wok",
    "Spice of Asia",
    "Taste of India",
    "Sushi Delight",
    "Grill Master",
    "Seoul Spice",
    "Thai Tantalize",
    "Pho Paradise",
    "Mexican Fiesta",
    "Mediterranean Magic",
    "Green Bites",
    "Ocean Catch",
]

# All Providers and Functions Defined Here


class SingaporeanDishProvider(BaseProvider):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.dishes = list(dish_descriptions.keys())
        random.shuffle(self.dishes)
        self.index = 0

    def singaporean_dish(self):
        if self.index < len(self.dishes):
            dish = self.dishes[self.index]
            self.index += 1
            return dish
        else:
            raise Exception("All dishes have been generated.")


fake.add_provider(SingaporeanDishProvider)


# Function to generate customer data with random numbers in the email
def generate_customer_data(customerid):
    customername = fake.first_name()
    random_number = fake.random_int(min=0, max=999)
    customeremail = f"{customername.lower()}{random_number}@example.com"
    customerpassword = fake.password(length=random.randint(
        8, 12), special_chars=True, digits=True, upper_case=True, lower_case=True)
    return (customerid, customername, customeremail, customerpassword)


def generate_dish_data(dishid):
    while True:
        dishname = fake.singaporean_dish()
        dishdescription = dish_descriptions[dishname]

        # Additional food-related words to include in the description
        food_words = ["delicious", "tasty",
                      "mouthwatering", "savory", "flavorful"]

        # Add food words to the description
        dishdescription += f" This {random.choice(food_words)} dish is {random.choice(food_words)} and {random.choice(food_words)}."

        # Generate with 1 decimal place
        dishprice = round(random.uniform(5, 20), 1)
        # Format to display with 2 decimal places
        dishprice_formatted = "{:.2f}".format(dishprice)
        dishavailable = random.choice([0, 1])
        dishimgpath = f"https://picsum.photos/200/200?random={dishid}"
        return (dishid, dishname, dishdescription, dishprice_formatted, dishavailable, dishimgpath)


def generate_inventoryitem_data(inventoryitemid, ingredientid):
    inventoryitemname = fake.word().capitalize() + " Storage"
    inventoryitemqty = random.randint(10, 100)
    inventoryitemmin = random.randint(5, 50)
    inventoryitemmax = inventoryitemmin + random.randint(10, 100)
    expirydate = fake.date_between(start_date="today", end_date="+2y")
    inventoryitemunit = fake.word().capitalize() + "s"
    return (inventoryitemid, inventoryitemname, inventoryitemqty, inventoryitemmin, inventoryitemmax, expirydate, inventoryitemunit, ingredientid)


def generate_dish_ingredient_relationship_data(ingredient_data):
    relationship_data = []
    for dishid in range(1, 11):
        num_ingredients = random.randint(1, 5)
        ingredients = random.sample(ingredient_data, num_ingredients)
        for ingredient in ingredients:
            relationship_data.append((dishid, ingredient[0]))
    return relationship_data


# Initialize ingredient_data before the loop
ingredient_data = []
for i, (name, unit) in enumerate(ingredient_data, start=current_ingredient_id):
    ingredient_data.append((i, name, unit))


def generate_dish_ingredient_relationship_data(ingredient_data):
    relationship_data = []
    for dishid in range(1, 11):
        num_ingredients = min(random.randint(1, 5), len(ingredient_data))
        ingredients = random.sample(ingredient_data, num_ingredients)
        for ingredient in ingredients:
            relationship_data.append((dishid, ingredient[0]))
    return relationship_data


# Function to generate fake order data
def generate_order_data(orderid, storeid):
    ordersubtotal = round(random.uniform(20, 100), 2)

    # Calculate a random order date and time within the next 2 months
    today = datetime.now()
    future_date = today + timedelta(days=random.randint(1, 60), hours=random.randint(
        0, 23), minutes=random.randint(0, 59), seconds=random.randint(0, 59))

    # Format the date and time to the desired format
    orderdatetime = future_date.strftime('%Y-%m-%d %H:%M:%S')

    # Round ordertotal to 2 decimal places
    ordertotal = round(ordersubtotal + random.uniform(5, 20), 2)
    orderdatetime = future_date
    ordertype = random.choice(['Dine-in', 'Takeaway'])
    orderstatus = random.choice(['Pending', 'In Progress', 'Delivered'])
    paymenttype = random.choice(['Credit Card', 'Cash', 'PayPal'])

    return (orderid, storeid, ordersubtotal, ordertotal, orderdatetime, ordertype, orderstatus, paymenttype)
# Function to generate fake order item data


def generate_orderitem_data(orderitemid, orderid, dishid):
    orderitemqty = random.randint(1, 5)
    return (orderitemid, orderid, dishid, orderitemqty)


# Function to generate a unique store name
def generate_unique_store_name():
    while True:
        storename = random.choice(store_names)
        if storename not in used_store_names:
            used_store_names.add(storename)
            return storename


# Function to generate fake store data
def generate_store_data(storeid):

    storename = generate_unique_store_name()

    storeunit = f"#{random.randint(1, 3):02d}-{random.randint(1, 999):03d}"
    storephone = f"656{fake.random_int(min=0000000, max=9999999):07d}"

    storecategory = generate_unique_store_category()

    storeemail = storename.lower().replace(" ", "") + "@example.com"
    # Ensure unique email
    while storeemail in used_emails:
        storeemail = storename.lower().replace(" ", "") + "@example.com"
    used_emails.add(storeemail)

    storepassword = fake.password(length=random.randint(
        8, 12), special_chars=True, digits=True, upper_case=True, lower_case=True)
    return (storeid, storename, storeunit, storephone, storecategory, storeemail, storepassword)

# Function to generate a unique store category


def generate_unique_store_category():
    while True:
        storecategory = random.choice(store_categories)
        if storecategory not in used_store_categories:
            used_store_categories.add(storecategory)
            return storecategory


def write_to_csv(data, headers, filename):
    with open(filename, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(headers)
        csvwriter.writerows(data)


# Streamlined Data Generation and CSV Writing
if __name__ == "__main__":

    # Generate Customer Data
    customer_data = [generate_customer_data(i) for i in range(1, 11)]
    write_to_csv(customer_data, ['customerid', 'customername',
                 'customeremail', 'customerpassword'], 'customer.csv')

    # Generate Dish Data
    dish_data = [generate_dish_data(i) for i in range(1, 11)]
    write_to_csv(dish_data, ['dishid', 'dishname', 'dishdescription',
                 'dishprice', 'dishavailable', 'dishimgpath'], 'dish.csv')

    # Generate Dish-Ingredient Relationship
    relationship_data = generate_dish_ingredient_relationship_data(
        ingredient_data)
    write_to_csv(relationship_data, [
                 'relationshipid', 'dishid', 'ingredientid'], 'dishingredient.csv')

    # Generate Ingredient Data
    ingredient_data = [generate_inventoryitem_data(i, i) for i in range(1, 11)]
    write_to_csv(ingredient_data, ['ingredientid', 'ingredientname', 'ingredientqty',
                                   'ingredientmin', 'ingredientmax', 'expirydate', 'ingredientunit'], 'ingredient.csv')

    # Generate Inventory Item Data
    inventory_data = [generate_inventoryitem_data(i, i) for i in range(1, 11)]
    write_to_csv(inventory_data, ['inventoryitemid', 'inventoryitemname', 'inventoryitemqty', 'inventoryitemmin',
                 'inventoryitemmax', 'expirydate', 'inventoryitemunit', 'ingredientid'], 'inventoryitem.csv')

    # Generate Order Data
    order_data = [generate_order_data(
        i, random.randint(1, 5)) for i in range(1, 16)]
    write_to_csv(order_data, ['orderid', 'storeid', 'ordersubtotal', 'ordertotal',
                 'orderdatetime', 'ordertype', 'orderstatus', 'paymenttype'], 'order.csv')

    # Generate Order Item Data
    order_item_data = [generate_orderitem_data(i, random.randint(
        1, 10), random.randint(1, 10)) for i in range(1, 16)]
    write_to_csv(order_item_data, [
                 'orderitemid', 'orderid', 'dishid', 'orderitemqty'], 'orderitem.csv')

    # Generate Store Data
    store_data = [generate_store_data(i) for i in range(1, 11)]
    write_to_csv(store_data, ['storeid', 'storename', 'storeunit', 'storephone',
                 'storecategory', 'storeemail', 'storepassword'], 'store.csv')
