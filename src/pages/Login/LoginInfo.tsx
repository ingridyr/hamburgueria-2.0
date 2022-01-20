import { Flex, Grid, Image, Text } from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";

import Logo from "../../assets/logo-kenzie-burger.svg";
import Details from "../../assets/details.png";
import { theme } from "../../styles/theme";

export const LoginInfo = () => {
  return (
    <Grid
      w={["90%", "90%", "40%", "30%"]}
      alignContent="center"
      justifyContent="start"
      h={["auto", "auto", "100%", "100%"]}
      m={["20px", "0", "0", "0"]}
      mt={["0", "0", "10%", "10%"]}
    >
      <Image src={Logo} alt="kenzie-burguer" w="210px" h="80px" />
      <Flex
        border="3px solid"
        borderColor="grey.0"
        borderRadius="5px"
        justifyContent="space-around"
        alignItems="center"
        boxShadow="0px 4px 15px 1px #f8f8f8;"
        h="100px"
      >
        <Flex
          boxSize="50px"
          alignItems="center"
          justifyContent="center"
          borderRadius="5px"
          bg="#E9F7EF"
        >
          <FiShoppingBag size={23} color={theme.colors.color.primary} />
        </Flex>
        <Text w="70%" color="grey.300" fontSize="md">
          A vida é como um sanduíche, é preciso recheá-la com os <b>melhores</b>{" "}
          ingredientes.
        </Text>
      </Flex>
      <Image
        src={Details}
        alt="bubbles"
        m="20px 0"
        display={["none", "none", "block", "block"]}
      />
    </Grid>
  );
};
