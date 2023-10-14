import food1 from "./customer/images/food1.jpg";
import axios from "axios";
import React, { useState, useEffect } from "react";

// export const stores = [
//   {
//     name: "Store 1",
//     dishes: [
//       {
//         name: "Chicken Rice",
//         description: "This is Chicken Rice",
//         image: food1,
//         basePrice: 3.5,
//       },
//       {
//         name: "Noodles",
//         description: "This is Noodles",
//         image: food1,
//         basePrice: 4.0,
//       },
//       {
//         name: "Chicken Rice",
//         description: "This is Chicken Rice",
//         image: food1,
//         basePrice: 3.5,
//       },
//       {
//         name: "Noodles",
//         description: "This is Noodles",
//         image: food1,
//         basePrice: 4.0,
//       },
//       {
//         name: "Chicken Rice",
//         description: "This is Chicken Rice",
//         image: food1,
//         basePrice: 3.5,
//       },
//       {
//         name: "Noodles",
//         description: "This is Noodles",
//         image: food1,
//         basePrice: 4.0,
//       },
//     ],
//   },
//   {
//     name: "Store 2",
//     dishes: [
//       {
//         name: "Soup",
//         description: "This is Soup",
//         image: food1,
//         basePrice: 5.0,
//       },
//       {
//         name: "Chicken Rice",
//         description: "This is Chicken Rice",
//         image: food1,
//         basePrice: 3.5,
//       },
//       {
//         name: "Noodles",
//         description: "This is Noodles",
//         image: food1,
//         basePrice: 4.0,
//       },
//     ],
//   },
//   {
//     name: "Store 3",
//     dishes: [
//       {
//         name: "Soup",
//         description: "This is Soup",
//         image: food1,
//         basePrice: 5.0,
//       },
//       {
//         name: "Chicken Rice",
//         description: "This is Chicken Rice",
//         image: food1,
//         basePrice: 3.5,
//       },
//       {
//         name: "Noodles",
//         description: "This is Noodles",
//         image: food1,
//         basePrice: 4.0,
//       },
//     ],
//   },
// ];

function Data() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8600/stores-menu-items")
      .then((response) => {
        setData(response.data);
        console.log("This is our experiment lmfao");
        console.log(response.body);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // const stores = data;
  return data;
}

export const stores = Data();
