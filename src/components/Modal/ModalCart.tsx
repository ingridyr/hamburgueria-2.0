import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg="color.primary"
            color="white"
            borderRadius="5px 5px 0 0"
          >
            Carrinho de compras
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text>lógica do carrinho aqui</Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              variant="ghost"
              bgColor="grey.0"
              color="grey.300"
              w="100%"
              _hover={{ bgColor: "grey.300", color: "grey.0" }}
            >
              Remover todos
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
