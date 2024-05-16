import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:3003/product", {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (err) {
      alert("ERROR: Something went wrong!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products };
};
