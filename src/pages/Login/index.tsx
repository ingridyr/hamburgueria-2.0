import {
  Flex,
  Grid,
  Text,
  Image,
  Heading,
  VStack,
  Button,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { Input } from "../../components/Form/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "../../assets/logo-kenzie-burger.svg";
import Details from "../../assets/details.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const signInSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  password: yup.string().min(6).required("Senha obrigatória"),
});

interface SignInData {
  name: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => console.log(errors);
  const navigate = useNavigate();

  return (
    <Flex height={["auto", "auto", "100vh", "100vh"]} alignItems="center">
      <Flex
        w="100%"
        justifyContent="center"
        flexDirection={["column", "column", "row-reverse", "row-reverse"]}
        alignItems={["center", "center", "flex-start", "flex-start"]}
      >
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
              <FiShoppingBag size={23} color={"#27AE60"} />
            </Flex>
            <Text w="70%" color="grey.300" fontSize="md">
              A vida é como um sanduíche, é preciso recheá-la com os{" "}
              <b>melhores</b> ingredientes.
            </Text>
          </Flex>
          <Image
            src={Details}
            alt="bubbles"
            m="20px 0"
            display={["none", "none", "block", "block"]}
          />
        </Grid>
        <Grid
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          margin={["2", "2", "10", "10"]}
          w={["auto", "auto", "35%", "35%"]}
          h={["600px", "600px", "550px", "550px"]}
          padding="30px 25px"
          border="2px solid"
          borderColor="grey.0"
          borderRadius="5px"
          bg="white"
          color="grey.600"
        >
          <Heading size="md" >
            Login
          </Heading>
          <VStack h="90%" gap="10px" justifyContent="space-around">
            <Input
              placeholder="Digite seu nome"
              label="Nome"
              type="text"
              error={errors.name}
              icon={FaUser}
              {...register("name")}
            />
            <Input
              placeholder="Digite sua senha"
              label="Senha"
              type="password"
              error={errors.password}
              icon={FaLock}
              {...register("password")}
            />
          </VStack>
          <VStack justifyContent="space-between">
            <Button
              isLoading={loading}
              type="submit"
              focusBorderColor="none"
              loadingText="Enviando"
              h="50px"
              color="#ffff"
              bgColor="color.primary"
              _hover={{ bgColor: "color.primary-50" }}
              m="10px 0"
              w="100%"
            >
              Logar
            </Button>
            <Text
              w="80%"
              h="60px"
              textAlign="center"
              color="grey.300"
              m="20px 0"
            >
              Crie sua conta para saborear muitas delícias e matar sua fome!
            </Text>
            <Button
              h="50px"
              bgColor="grey.0"
              color="grey.300"
              onClick={() => navigate("/register")}
              _hover={{ bgColor: "grey.300" }}
              w="100%"
              m="10px 0"
            >
              Cadastrar
            </Button>
          </VStack>
        </Grid>
      </Flex>
    </Flex>
  );
};
