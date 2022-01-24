import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartProps {
  children: ReactNode;
}

interface ProductCardProps {
  [x: string]: any;
  title: string;
  category: string;
  price: number;
  image: string;
  id: any;
}

interface CartProviderData {
  cart: ProductCardProps[];
  addProduct: (product: ProductCardProps) => void;
  deleteProduct: (productToBeDeleted: ProductCardProps) => void;
  totalValue: (productTotal: ProductCardProps) => void;
  counter: number;
  setCounter: any;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<ProductCardProps[]>(() =>
    JSON.parse(localStorage.getItem("@cart") || "[]")
  );

  //console.log(cart);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    setCounter(cart.length)
  }, [cart]);

  const addProduct = (product: ProductCardProps) => {
    const result = [...cart, product];
    setCart(result);
    localStorage.setItem("@cart", JSON.stringify(result));
  };

  const deleteProduct = (productToBeDeleted: ProductCardProps) => {
    const { id } = productToBeDeleted;
    const index = cart.findIndex((item) => item.id === id);

    const newCart = cart.filter((_, currIndex) => currIndex !== index);
    setCart(newCart);
    localStorage.setItem("@cart", JSON.stringify(newCart));
  };

  const totalValue = (productTotal: ProductCardProps) => {
    const total = productTotal.price;
    return total;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        deleteProduct,
        totalValue,
        counter,
        setCounter,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
