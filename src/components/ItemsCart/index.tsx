import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
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
  const { deleteProduct } = useCart();

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
          bgColor="grey.100"
          w="80px"
          h="80px"
          borderRadius='5px'
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
          <Text color="grey.300">contador</Text>
          
        </Flex>
      </Flex>
      <Box m="30px 15px">
        <FaTrash color={theme.colors.grey["150"]} onClick={() => deleteProduct(products)} />
      </Box>
    </Flex>
  );
};
