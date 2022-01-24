import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { ItemsCart } from "../ItemsCart";

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const { cart } = useCart();

  //esse bloco de código foi consultado em: https://ichi.pro/pt/como-encontrar-objetos-unicos-em-uma-matriz-em-javascript-por-referencia-de-objeto-ou-pares-de-valores-chave-20973273845114
  const objectsJSON = cart.map((object) => JSON.stringify(object));
  const objectsJSONSet = new Set(objectsJSON);
  const uniqueJSONArray = Array.from(objectsJSONSet);

  const newCartUnique = uniqueJSONArray.map((string) => JSON.parse(string));
  //esse bloco de código foi consultado em: https://ichi.pro/pt/como-encontrar-objetos-unicos-em-uma-matriz-em-javascript-por-referencia-de-objeto-ou-pares-de-valores-chave-20973273845114

  const totalValue = cart.reduce((acc, {price}) => acc + price, 0)
  console.log(totalValue)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg="color.primary"
            color="white"
            borderRadius="5px 5px 0 0"
          >
            Carrinho de compras
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            {cart.length > 0 ? (
              <>
                {newCartUnique.map((item) => 
                  <ItemsCart products={item} key={item.id} />
                )}

                <hr />
                <Text>total: {totalValue.toFixed(2)}</Text>
              </>
            ) : (
              <Box>
                <Text>Your cart is empty</Text>
                <Text>Add items</Text>
              </Box>
            )}
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              focusBorderColor="none"
              type="submit"
              h="50px"
              bgColor="grey.100"
              color="grey.300"
              _hover={{ bgColor: "grey.300", color: "grey.0" }}
              w="100%"
              m="10px 0"
            >
              Remover todos
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
