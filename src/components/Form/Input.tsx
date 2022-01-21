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

import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";

interface InputProps extends ChakraInputProps {
  email?: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: "signal.negative",
  default: "grey.300",
  focus: "grey.600",
  filled: "signal.success",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { email, icon: Icon, label, error = null, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      return setVariation("focus");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          color={inputVariation[variation]}
          bgColor="white"
          position="absolute"
          top="-1"
          h="18px"
          zIndex="1"
          ml="2"
          padding="0 5px"
          borderRadius="3px 3px 0 0"
        >
          {label}
        </FormLabel>
      )}

      <InputGroup flexDirection="column" zIndex="0" m="10px 0">
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt="1.9">
            <Icon />
          </InputLeftElement>
        )}

        <ChakraInput
          onChangeCapture={(e) => setValue(e.currentTarget.value)}
          variant="outline"
          color={inputVariation[variation]}
          border="2.5px solid"
          borderColor={inputVariation[variation]}
          borderRadius="5px"
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          _hover={{ borderColor: "grey.100" }}
          _placeholder={{ color: "grey.300" }}
          focusBorderColor="none"
          size="md"
          h="50px"
          position="relative"
          ref={ref}
          {...rest}
        />

        {!!error && (
          <FormErrorMessage color="signal.negative">
            {error.message}
          </FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
