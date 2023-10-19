import { Route, Routes } from "react-router-dom";
import Home from "./customer/pages/Home";
import Menu from "./customer/pages/Menu";
import Cart from "./customer/pages/Cart";
import Account from "./customer/pages/Account";
import Settings from "./customer/pages/Settings";
import Information from "./customer/pages/FrequentlyAskedQuestions";
import AboutUs from "./customer/pages/AboutUs";
import ContactUs from "./customer/pages/ContactUs";
import VendorSite from "./customer/pages/VendorSite";
import PrivacyPolicy from "./customer/pages/PrivacyPolicy";
import TermsConditions from "./customer/pages/TermsConditions";
import AccountDashboard from "./customer/pages/Dashboard";
import ResetPassword from "./customer/pages/ResetPassword";
import LogIn from "./customer/pages/LogIn";
import SignUp from "./customer/pages/SignUp";
import DishSelection from "./customer/pages/DishSelection";
import Receipt from "./customer/pages/Receipt";

import VendorLandingPage from "./vendor/pages/VendorLandingPage";
import VendorDashboard from "./vendor/pages/VendorDashboard";
import VendorOrders from "./vendor/pages/VendorOrders";
import VendorMenu from "./vendor/pages/VendorMenu";
import VendorInventory from "./vendor/pages/VendorInventory";
import VendorAnalytics from "./vendor/pages/VendorAnalytics";
import VendorContact from "./vendor/pages/VendorContact";
import VendorSettings from "./vendor/pages/VendorSettings";
import VendorSignUp from "./vendor/pages/VendorSignUp";
import VendorLogIn from "./vendor/pages/VendorLogIn";
import VendorAccount from "./vendor/pages/VendorAccount";
import VendorAddNewDish from "./vendor/pages/VendorAddNewDish";
import VendorTransactions from "./vendor/pages/VendorTransactions";

export default function Routing() {
  return (
    <div>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/faq" element={<Information />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/vendorsite" element={<VendorSite />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsconditions" element={<TermsConditions />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/dishselection" element={<DishSelection />} /> */}
        <Route path="/dishselection/:itemId" element={<DishSelection />} />
        <Route path="/receipt" element={<Receipt />} />

        {/* Vendor */}
        <Route path="/vendor" element={<VendorLandingPage />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} />
        <Route path="/vendororders" element={<VendorOrders />} />
        <Route path="/vendormenu" element={<VendorMenu />} />
        <Route path="/vendoraddnewdish" element={<VendorAddNewDish />} />
        <Route path="/vendorinventory" element={<VendorInventory />} />
        <Route path="/vendoraccount" element={<VendorAccount />} />
        <Route path="/vendoranalytics" element={<VendorAnalytics />} />
        <Route path="/vendorcontact" element={<VendorContact />} />
        <Route path="/vendorsettings" element={<VendorSettings />} />
        <Route path="/vendorsignup" element={<VendorSignUp />} />
        <Route path="/vendorlogin" element={<VendorLogIn />} />
        <Route path="/vendortransactions" element={<VendorTransactions />} />
      </Routes>
    </div>
  );
}

// export default function Layout() {
//   return (
//     <div>
//       {/* A "layout route" is a good place to put markup you want to
//         share across all the pages on your site, like navigation. */}
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/dish-selection">Dish Selection</Link>
//           </li>
//           <li>
//             <Link to="/checkout-page">Checkout Page</Link>
//           </li>
//           <li>
//             <Link to="/receipt">Receipt</Link>
//           </li>
//           <li>
//             <Link to="/dish-order-page">Dish Order Page</Link>
//           </li>
//           <li>
//             <Link to="/about-us">About Us</Link>
//           </li>
//           <li>
//             <Link to="/sign-up">Sign Up</Link>
//           </li>
//           <li>
//             <Link to="/nothing-here">Nothing Here</Link>
//           </li>
//         </ul>
//       </nav>

//       <hr />

//       {/* An <Outlet> renders whatever child route is currently active,
//         so you can think about this <Outlet> as a placeholder for
//         the child routes we defined above. */}
//       <Outlet />
//     </div>
//   );
// }
