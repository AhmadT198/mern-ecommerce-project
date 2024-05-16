import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { ShopPage } from "./pages/shop";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { CheckoutPage } from "./pages/checkout";
import { ShopContextProvider } from "./context/shop-context";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;
