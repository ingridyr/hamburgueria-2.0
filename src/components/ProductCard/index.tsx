import { Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import { useCart } from "../../contexts/CartContext";

interface Products {
  title: string;
  category: string;
  price: number;
  image: string;
  id: number;
}

interface ProductCardProps {
  products: Products;
}

export const ProductCard = ({ products }: ProductCardProps) => {
  const { addProduct } = useCart();

  const toast = useToast();

  const handleClick = (item: any) => {
    addProduct(item);
    toast({
      title: "Produto adicionado ao carrinho",
      duration: 9000,
      isClosable: true,
      status: "success",
      position: "top",
    });
  };

  return (
    <>
      <Flex
        flexDirection="column"
        gap="20px"
        border="3px solid"
        borderRadius="5px"
        w="300px"
        h="346px"
        borderColor="grey.100"
        cursor="pointer"
        _hover={{ borderColor: "color.primary", transform: "translateY(-7px)" }}
        transition="border 1s, ease 4s,"
      >
        <Flex bgColor="grey.0" w="100%" h="40%" justifyContent="center">
          <Image src={products.image} alt={products.title} />
        </Flex>

        <Flex flexDirection="column" gap="20px" p="5px 15px 15px">
          <Heading size="md">{products.title}</Heading>
          <Text color="grey.300">{products.category}</Text>
          <Heading color="color.primary" size="sm">
            R$ {products.price},00
          </Heading>
          <Button
            _hover={{ bgColor: "color.primary" }}
            w="35%"
            h="35px"
            size="md"
            bgColor="grey.150"
            color="white"
            onClick={() => handleClick(products)}
          >
            Adicionar
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
