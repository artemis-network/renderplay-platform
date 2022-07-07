import { Cell } from '../grid/Cell'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button
} from '@chakra-ui/react'

export const InfoModal = ({ isOpen, handleClose }) => {
  const Content = () => <div>
    <p className="text-m text-light-500 dark:text-light-300">
      Guess the word in 5 tries. After each guess, the color of the tiles will
      change to show how close your guess was to the word.
    </p>

    <div className="flex justify-center mb-1 mt-4">
      <Cell
        isRevealing={true}
        isCompleted={true}
        value="T"
        status="correct"
      />
      <Cell value="R" />
      <Cell value="U" />
      <Cell value="S" />
      <Cell value="T" />
    </div>
    <p className="text-m text-light-500 dark:text-light-300">
      The letter T is in the word and in the correct spot.
    </p>

    <div className="flex justify-center mb-1 mt-4">
      <Cell value="C" />
      <Cell value="A" />
      <Cell
        isRevealing={true}
        isCompleted={true}
        value="M"
        status="present"
      />
      <Cell value="E" />
      <Cell value="L" />
    </div>
    <p className="text-m text-light-500 dark:text-light-300">
      The letter M is in the word but in the wrong spot.
    </p>

    <div className="flex justify-center mb-1 mt-4">
      <Cell value="B" />
      <Cell value="R" />
      <Cell value="E" />
      <Cell isRevealing={true} isCompleted={true} value="A" status="absent" />
      <Cell value="K" />
    </div>
    <p className="text-m text-light-500 dark:text-light-300">
      The letter A is not in the word in any spot.
    </p>
  </div>
  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent color={"white"} bg={"#321e43"} borderRadius="3xl">
        <ModalHeader textAlign={"center"} fontSize={"2xl"}>How to play?</ModalHeader>
        <ModalCloseButton bg={"#321e43"} color={"color"} _hover={{ bg: "white", color: "#321e43" }} />
        <ModalBody textAlign={"center"} fontSize={"large"} >
          <Content />
        </ModalBody>
        <ModalFooter justifyContent={"center"}>
          <Button colorScheme='linkedin' mr={3} onClick={handleClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
