import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

const dailyOrders = [...Array(30).keys()].map((day) => ({
  day: `Day ${day + 1}`,
  orders: Math.floor(Math.random() * 100),
}));

const topDishes = [
  { name: "Noodles", sales: 200 },
  { name: "Rice", sales: 180 },
  { name: "Soup", sales: 150 },
  { name: "Salad", sales: 130 },
  { name: "Dumplings", sales: 110 },
];

const revenueByDish = [
  { name: "Noodles", value: 2000 },
  { name: "Rice", value: 1800 },
  { name: "Soup", value: 1500 },
  { name: "Salad", value: 800 },
  { name: "Dumplings", value: 1100 },
];

export default function VendorAnalytics() {
  return (
    <div>
      <h2>Daily Orders Last Month</h2>
      <LineChart width={600} height={300} data={dailyOrders}>
        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
      </LineChart>

      <h2>Top 5 Best Selling Dishes</h2>
      <BarChart width={600} height={300} data={topDishes}>
        <Bar dataKey="sales" fill="#82ca9d" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </BarChart>

      <h2>Revenue Breakdown by Dish</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={revenueByDish}
          dataKey="value"
          nameKey="name"
          outerRadius={150}
          fill="#8884d8"
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
