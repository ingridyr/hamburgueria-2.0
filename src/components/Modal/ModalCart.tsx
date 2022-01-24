import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";
import { ItemsCart } from "../ItemsCart";

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const { cart, removeAllItems } = useCart();

  //esse bloco de código foi consultado em: https://ichi.pro/pt/como-encontrar-objetos-unicos-em-uma-matriz-em-javascript-por-referencia-de-objeto-ou-pares-de-valores-chave-20973273845114
  const objectsJSON = cart.map((object) => JSON.stringify(object));
  const objectsJSONSet = new Set(objectsJSON);
  const uniqueJSONArray = Array.from(objectsJSONSet);

  const newCartUnique = uniqueJSONArray.map((string) => JSON.parse(string));
  //esse bloco de código foi consultado em: https://ichi.pro/pt/como-encontrar-objetos-unicos-em-uma-matriz-em-javascript-por-referencia-de-objeto-ou-pares-de-valores-chave-20973273845114

  const totalValue = cart.reduce((acc, { price }) => acc + price, 0);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
                {newCartUnique.map((item) => (
                  <ItemsCart products={item} key={item.id} />
                ))}

                <hr />
                <Flex justifyContent="space-between" m="20px 0">
                  <Heading size="sm" color="grey.600">
                    Total
                  </Heading>
                  <Text color="grey.300">R$ {totalValue},00</Text>
                </Flex>
                <Button
                  focusBorderColor="none"
                  type="submit"
                  h="50px"
                  bgColor="grey.100"
                  color="grey.300"
                  _hover={{ bgColor: "grey.300", color: "grey.0" }}
                  w="100%"
                  m="10px 0"
                  onClick={() => removeAllItems()}
                >
                  Remover todos
                </Button>
              </>
            ) : (
              <Flex justifyContent="center" flexDirection="column" h="150px">
                <Heading color="grey.600" textAlign="center" size="md">
                  Sua sacola está vazia
                </Heading>
                <Text color="grey.300" textAlign="center" m="20px">
                  Adicione itens
                </Text>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
