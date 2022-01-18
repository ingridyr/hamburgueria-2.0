import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { IconType } from "react-icons/lib";
import { FieldError } from "react-hook-form";

import { useState, useEffect, useCallback, useRef } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

export const Input = ({
  name,
  error = null,
  icon: Icon,
  label,
  ...rest
}: InputProps) => {
  return (
    <FormControl>
      {!!label && <FormLabel>{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement mt="2.5">
            <Icon />
          </InputLeftElement>
        )}

        <ChakraInput
          name={name}
          variant="outline"
          outline='3px solid'
          outlineColor='gray.600'
          _hover={{ outlineColor: "gray.300" }}
          _placeholder={{ color: "gray.300" }}
          size='lg'
          h='60px'
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};
