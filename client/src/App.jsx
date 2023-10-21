import React from "react";
import VendorMain from "./vendor/VendorMain";
import CustomerMain from "./customer/CustomerMain";
import { VENDOR_BOOL } from "./SessionID";

export default function App() {
  return <div>{VENDOR_BOOL ? <VendorMain /> : <CustomerMain />}</div>;
}
//
