import React from "react";
import { Link, Route, Router } from "react-router-dom";
import LogIn from "./LogIn";
import AccountDashboard from "./Dashboard";

export default function Account() {
  const isLoggedIn = false; // replace with your own authentication logic
  return (
    <div>
      <div exact path="/">
        {isLoggedIn ? <Link to="/dashboard" /> : <LogIn />}
      </div>
      <div path="/dashboard">
        {isLoggedIn ? <AccountDashboard /> : <Link to="/" />}
      </div>
    </div>
  );
}
