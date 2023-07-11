import React from "react";
import Footer from "./customer/components/Footer";
import MainLayout from "./customer/pages/Layout";
import DishSelection from "./customer/pages/DishSelection";
import CheckoutPage from "./customer/pages/CheckOutPage";
import Receipt from "./customer/pages/OrderSummary";
import LandingPage from "./customer/pages/LandingPage";

export default function App() {
  return (
    <div>
      <MainLayout />
      <LandingPage />
      <DishSelection />
      <CheckoutPage />
      <Receipt />
      {/* <DishOrderPage /> */}
      {/* <SignUp /> */}
      {/* <AboutUs /> */}
      <Footer />
    </div>
  );
}
