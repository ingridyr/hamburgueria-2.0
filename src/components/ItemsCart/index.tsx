import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";

interface Products {
  title: string;
  category: string;
  price: number;
  image: string;
  id: number;
}

interface ItemsCartProps {
  products: Products;
}

export const ItemsCart = ({ products }: ItemsCartProps) => {
  const { addProduct, deleteProduct } = useCart();

  const [countProduct, setCountProduct] = useState<number>(1);

  const { cart } = useCart();

  const filteredProducts = cart.filter((item) => item.id === products.id);

  useEffect(() => {
    setCountProduct(filteredProducts.length);
  }, [filteredProducts]);

  return (
    <Flex
      gap="20px"
      border="3px solid"
      borderRadius="5px"
      w="100%"
      h="130px"
      borderColor="grey.100"
      cursor="pointer"
      m="10px 0"
      justifyContent="space-between"
      alignItems="strach"
    >
      <Flex>
        <Flex
          bgColor="grey.50"
          w="80px"
          h="80px"
          borderRadius="5px"
          justifyContent="center"
          m="15px"
          alignSelf="center"
        >
          <Image src={products.image} alt={products.title} />
        </Flex>

        <Flex
          alignSelf="center"
          flexDirection="column"
          gap="20px"
          p="5px 15px 15px"
        >
          <Heading size="md">{products.title}</Heading>

          <Flex
            flexDirection="row"
            alignItems="center"
            boxSizing="initial"
            justifyContent="space-between"
            w="130px"
            h="30px"
          >
            <Button
              variant="ghost"
              bgColor="grey.50"
              borderRadius="0"
              color="color.secondary"
              w="10%"
              h="100%"
              _hover={{ bgColor: "grey.100" }}
              onClick={() => deleteProduct(products)}
            >
              -
            </Button>

            <Text
              textAlign="center"
              w="40%"
              h="100%"
              border="3px solid"
              borderColor="grey.50"
            >
              {countProduct}
            </Text>

            <Button
              variant="ghost"
              bgColor="grey.50"
              borderRadius="0"
              w="10%"
              h="100%"
              color="color.secondary"
              _hover={{ bgColor: "grey.100" }}
              onClick={() => addProduct(products)}
            >
              +
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Box m="30px 15px" >
        <FaTrash
          color={theme.colors.grey["150"]}
          onClick={() => deleteProduct(products)}
        />
      </Box>
    </Flex>
  );
};
