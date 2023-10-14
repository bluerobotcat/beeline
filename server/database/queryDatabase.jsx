const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "@1234567",
  database: "react_test",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

const query_stores_dishes =
  "SELECT * FROM stores INNER JOIN dishes WHERE stores.id=dishes.store_id ORDER BY stores.id, dishes.name";

export function transformStoresDishes(data) {
  let resultMap = new Map();

  data.forEach((item) => {
    if (!resultMap.has(item.store_id)) {
      resultMap.set(item.store_id, {
        store_id: item.store_id,
        store_name: "store" + item.store_id.toString(),
        dishes: [],
      });
    }

    let storeData = resultMap.get(item.store_id);
    storeData.dishes.push({
      id: item.id,
      name: item.name,
      desc: item.description,
      unit_price: item.unit_price,
      // image_path: item.image_path,
    });
  });

  return [...resultMap.values()];
}

export function fetchStoresDishes(callback) {
  db.query(query_stores_dishes, (err, results) => {
    if (err) {
      console.log(err);
      callback(err, null);
      return;
    }
    callback(null, transformStoresDishes(results));
  });
}
