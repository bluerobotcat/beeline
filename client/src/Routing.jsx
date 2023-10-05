import { Route, Routes } from "react-router-dom";
import Home from "./customer/pages/Home";
import Menu from "./customer/pages/Menu";
import CartList from "./customer/pages/Cart";
import Account from "./customer/pages/Account";
import Settings from "./customer/pages/Settings";
import Information from "./customer/pages/Information";
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
import Receipt from "./customer/pages/OrderSummary";

export default function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<CartList />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/information" element={<Information />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/vendorsite" element={<VendorSite />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/termsconditions" element={<TermsConditions />} />
        <Route path="/dashboard" element={<AccountDashboard />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dishselection" element={<DishSelection />} />
        <Route path="/receipt" element={<Receipt />} />
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
