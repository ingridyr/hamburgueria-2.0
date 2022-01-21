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

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalError = ({ isOpen, onClose }: ModalErrorProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="signal.negative" color='white' borderRadius="5px 5px 0 0">
            Oops...
          </ModalHeader>
          <ModalCloseButton color='white'/>
          <ModalBody>
            <Text>Algo deu errado!</Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              w="100%"
              bg="signal.negative"
              _hover={{ bgColor: "color.secondary" }}
              color="white"
              onClick={onClose}
            >
              Tentar Novamente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
