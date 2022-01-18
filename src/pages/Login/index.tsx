import { Flex, Grid, Text, Image, Heading, VStack } from "@chakra-ui/react";
import Logo from "../../assets/logo-kenzie-burger.svg";

import { Input } from "../../components/Form/Input";
import { FaEnvelope, FaLock } from "react-icons/fa";


export const Login = () => {
  return (
    <Flex height="100vh" alignItems="center">
      <Flex
        w="100%"
        justifyContent="center"
        flexDirection="row-reverse"
        alignItens="center"
        border="2px solid black"
      >
        <Grid
          w="30%"
          border="2px solid blue"
          justifyContent="center"
        >
          <Image src={Logo} alt="kenzie-burguer" boxSize="120px" />
          <Flex
            border="2px solid purple"
            justifyContent="center"
            alignItems="center"
          >
            <Text>Algo aqui</Text>
          </Flex>
        </Grid>
        <Grid
          as="form"
          margin="10"
          w="40%"
          h="400px"
          padding="30px 25px"
          border="3px solid"
          borderColor='grey.0'
          borderRadius='5px'
          bg="white"
          color="grey.600"
        >
          <Heading size="lg">Login</Heading>
          <VStack spacing="5" mt="6">
            <Input placeholder="Digite seu nome" icon={FaEnvelope}  name='email'/>
            <Input placeholder="Digite sua senha" icon={FaLock} name='password'/>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};

