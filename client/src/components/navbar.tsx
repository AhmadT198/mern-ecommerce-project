import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const [_, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    setCookies("access_token", null);
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>Random Shop</h1>
      </div>

      <div className="navbar-links">
        {isAuthenticated && (
          <>
            <Link to="/">Shop</Link>
            <Link to="/purchased-items">Purchases</Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/login" onClick={logout}>
              Logout
            </Link>
            <span>${availableMoney.toFixed(2)}</span>
          </>
        )}
      </div>
    </div>
  );
};
