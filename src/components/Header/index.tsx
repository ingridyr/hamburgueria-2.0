import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/logo-kenzie-burger.svg";
import { theme } from "../../styles/theme";
import { useAuth } from "../../contexts/AuthContext";
import { ModalCart } from "../Modal/ModalCart";

export const Header = () => {
  const { signOut } = useAuth();

  const {
    isOpen: isModalCartOpen,
    onOpen: onModalCartOpen,
    onClose: onModalCartClose,
  } = useDisclosure();

  return (
    <>
      <ModalCart isOpen={isModalCartOpen} onClose={onModalCartClose} />

      <Flex
        bgColor="grey.0"
        borderColor="grey.300"
        justifyContent="space-between"
        alignItems="center"
        p="0 5%"
      >
        <Image src={Logo} alt="logo" w="210px" h="80px" />
        <Flex>
          {/* search */}
          <Box justifyContent="space-around" w="50px" position="relative">
            <Box onClick={() => onModalCartOpen()}>
              <FaShoppingCart
                size={25}
                color={theme.colors.grey["150"]}
                cursor="pointer"
              />
            </Box>
            <Flex
              position="absolute"
              top="-3"
              left="4"
              bgColor="color.primary"
              w="auto"
              h="20px"
              p="5px"
              justifyContent="center"
              alignItems="center"
              color="white"
              borderRadius="5px"
              fontWeight="600"
              textAlign="center"
            >
              0
            </Flex>
          </Box>
          <FaSignOutAlt
            size={25}
            color={theme.colors.grey["150"]}
            onClick={signOut}
            cursor="pointer"
          />
        </Flex>
      </Flex>
    </>
  );
};
