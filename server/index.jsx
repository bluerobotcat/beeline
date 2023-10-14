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

// db.query("SELECT id FROM stores", (err, results) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(results);
//     const store_ids = results.map((x) => x.id);
//     console.log(store_ids);
//   }
// });

// function veronima_stores(success) {
//   value = db.query("SELECT id FROM stores", (err, results) => {
//     if (err) {
//       console.log(err);
//     }
//     return success(results.map((x) => x.id));
//   });
// }

// veronima_stores(function (store_ids) {
//   console.log(store_ids);
//   store_ids.forEach((element) => {
//     db.query(
//       "SELECT * FROM dishes WHERE store_id=" + element.toString(),
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log(element, result);
//       }
//     );
//   });
//   db.end();
// });

const queryStr =
  "SELECT * FROM stores INNER JOIN dishes WHERE \
  stores.id=dishes.store_id ORDER BY stores.id, dishes.name";

// const queryStr = "SELECT * FROM stores";

function transformData(data) {
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

value = db.query(queryStr, (err, results) => {
  if (err) {
    console.log(err);
  }
  results = transformData(results);
  console.log(results);
});
