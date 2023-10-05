const mysql = require("mysql2");
var store_ids;

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

function veronima_stores(success) {
  value = db.query("SELECT id FROM stores", (err, results) => {
    if (err) {
      console.log(err);
    }
    return success(results.map((x) => x.id));
  });
}

veronima_stores(function (store_ids) {
  console.log(store_ids);
  store_ids.forEach((element) => {
    db.query(
      "SELECT * FROM dishes WHERE store_id=" + element.toString(),
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(element, result);
      }
    );
  });
  db.end();
});
