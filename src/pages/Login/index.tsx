import {
  Flex,
  Grid,
  Text,
  Heading,
  VStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa";
import { Input } from "../../components/Form/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { LoginInfo } from "./LoginInfo";
import { ModalError } from "../../components/Modal/ModalError";

const signInSchema = yup.object().shape({
  email: yup.string().required("Nome obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha precisa ter no mínimo 6 dígitos")
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);

  const { signIn, user } = useAuth();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  console.log(user);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    setLoading(true);

    signIn(data)
      .then((_) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };

  const navigate = useNavigate();

  return (
    <>
      <ModalError isOpen={isModalErrorOpen} onClose={onModalErrorClose} />

      <Flex height={["auto", "auto", "100vh", "100vh"]} alignItems="center">
        <Flex
          w="100%"
          justifyContent="center"
          flexDirection={["column", "column", "row-reverse", "row-reverse"]}
          alignItems={["center", "center", "flex-start", "flex-start"]}
        >
          <LoginInfo />

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
            <Heading size="md">Login</Heading>
            <VStack h="90%" gap="10px" justifyContent="space-around">
              <Input
                placeholder="Digite seu email"
                label="Email"
                type="email"
                error={errors.email}
                icon={FaUser}
                {...register("email")}
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
                onClick={() => navigate("/signup")}
                _hover={{ bgColor: "grey.300", color: "grey.0" }}
                w="100%"
                das
                m="10px 0"
              >
                Cadastrar
              </Button>
            </VStack>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
