import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

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
  getProducts: () => void;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used within an ProductsProvider");
  }

  return context;
};

const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Products[]>([]);

  const token = localStorage.getItem("@Kb:accessToken");

  const getProducts = async () => {
    await api
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
      });
  };

  useEffect(() => {
    getProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProductsContext.Provider
      value={{ products, getProducts } as unknown as ProductsContextData}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { useProducts, ProductsProvider };
