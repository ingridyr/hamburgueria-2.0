import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./AuthContext";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ProductsProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CartProvider>
    </ProductsProvider>
  </AuthProvider>
);
