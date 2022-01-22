import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

interface ProductsProviderProps {
  children: ReactNode;
}

interface Products {
  map(arg0: (item: any) => JSX.Element): ReactNode;
  title: string;
  category: string;
  price: number;
  image: string;
  id: number;
}

interface ProductsContextData {
  products: Products;
  showProducts: (data: Products, accessToken: string) => Promise<void>
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within an ProductsProvider");
  }

  return context;
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Products[]>([]);

  const { accessToken }  = useAuth()

  useEffect(() => {
    api
      .get("/products", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      });
  }, [accessToken]);

  return (
    <ProductsContext.Provider value={{ products } as unknown as ProductsContextData}>{children}</ProductsContext.Provider>
  );
};

export { useProducts, ProductsProvider };
