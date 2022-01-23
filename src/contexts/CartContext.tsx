import { createContext, useContext, useState, ReactNode } from "react";

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
  increment: () => void;
  decrement: () => void;
  counter: number;
  setCounter: any;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<ProductCardProps[]>(() =>
    JSON.parse(localStorage.getItem("@cart") || "[]")
  );

  const [counter, setCounter] = useState<number>(0);

  const decrement = () => {
    setCounter(counter - 1);
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  const addProduct = (product: ProductCardProps) => {
    const { id } = product;
    let index = cart.findIndex((item) => item.id === id);

    if (index === -1) {
      let result = [...cart, product];
      setCart(result);
      localStorage.setItem("@cart", JSON.stringify(result));
      increment()
    } else {
      increment();
    }
  };

  const deleteProduct = (productToBeDeleted: ProductCardProps) => {
    const { id } = productToBeDeleted;
    let index = cart.findIndex((item) => item.id === id);

    const newCart = cart.filter((_, currIndex) => currIndex !== index);
    setCart(newCart);
    decrement()
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
        decrement,
        increment,
        counter,
        setCounter
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
