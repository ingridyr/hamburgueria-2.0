import {
  Flex,
  Grid,
  Heading,
  VStack,
  Button,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Input } from "../../components/Form/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupInfo } from "./SignupInfo";
import api from "../../services/api";
import { ModalError } from "../../components/Modal/ModalError";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().email("Formato inválido").required("Email obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "A senha precisa ter no mínimo 6 dígitos"),
  confirm_password: yup
    .string()
    .required("Campo obrigatório")
    .oneOf([yup.ref("password"), "Senhas diferentes"]),
});

interface SignUpData {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignup = ({ name, email, password }: SignUpData) => {
    setLoading(true);

    api
      .post("/register", { name, email, password })
      .then((response) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };

  return (
    <>
      <ModalError isOpen={isModalErrorOpen} onClose={onModalErrorClose} />
      <Flex height={["auto", "auto", "100vh", "100vh"]} alignItems="center">
        <Flex
          w="100%"
          justifyContent="center"
          flexDirection={["column", "column", "row", "row"]}
          alignItems={["center", "center", "flex-start", "flex-start"]}
        >
          <SignupInfo />

          <Grid
            as="form"
            onSubmit={handleSubmit(handleSignup)}
            margin={["2", "2", "10", "10"]}
            w={["auto", "auto", "35%", "35%"]}
            h={["600px", "600px", "500px", "500px"]}
            padding="30px 25px"
            border="3px solid"
            borderColor="grey.0"
            borderRadius="5px"
            bg="white"
            color="grey.600"
          >
            <Flex justifyContent="space-between">
              <Heading size="md" mb="40px">
                Cadastro
              </Heading>
              <Box onClick={() => navigate("/")} cursor="pointer">
                <Text color="grey.300" textDecoration='underline'>Retornar para o login</Text>
              </Box>
            </Flex>
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
                placeholder="Digite seu email"
                label="Email"
                type="email"
                error={errors.email}
                icon={FaEnvelope}
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
              <Input
                placeholder="Confirme sua senha"
                type="password"
                label="Confirmar senha"
                error={errors.confirm_password}
                icon={FaLock}
                {...register("confirm_password")}
              />
            </VStack>
            <VStack justifyContent="space-between">
              <Button
                isLoading={loading}
                loadingText="Enviando"
                focusBorderColor="none"
                type="submit"
                h="50px"
                bgColor="grey.0"
                color="grey.300"
                _hover={{ bgColor: "grey.300", color: "grey.0" }}
                w="100%"
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
