import { createContext, useContext, useState, ReactNode } from "react";

interface CartProps {
  children: ReactNode;
}

interface ProductCardProps {
  title: string;
  category: string;
  price: number;
  image: string;
  id: number;
}

interface CartProviderData {
  cart: ProductCardProps[];
  addProduct: (product: ProductCardProps) => void;
  deleteProduct: (productToBeDeleted: ProductCardProps) => void;
  totalValue: (productTotal: ProductCardProps) => void;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider = ({ children }: CartProps) => {
  const [cart, setCart] = useState<ProductCardProps[]>(() =>
    JSON.parse(localStorage.getItem("@cart") || "[]")
  );

  console.log(cart);

  const addProduct = (id: ProductCardProps) => {
    let result = [...cart, id];
    setCart(result);
    localStorage.setItem("@cart", JSON.stringify(result));
  };

  const deleteProduct = (productToBeDeleted: ProductCardProps) => {
    const { id } = productToBeDeleted;
    let index = cart.findIndex((item) => item.id === id);

    const newCart = cart.filter((_, currIndex) => currIndex !== index);
    setCart(newCart);
    localStorage.setItem("@cart", JSON.stringify(newCart));
  };

  const totalValue = (productTotal: ProductCardProps) => {

    const total = productTotal.price
    return total
  };

  return (
    <CartContext.Provider value={{ cart, addProduct, deleteProduct, totalValue }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
