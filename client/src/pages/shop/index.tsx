import { useContext } from "react";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Navigate } from "react-router-dom";
export const ShopPage = () => {
  const { products } = useGetProducts();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
