import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, Box
} from '@chakra-ui/react'

import Lottie from 'lottie-react-web'

import WON from '../../../../../assets/rendle/rendle_game/little-boy-with-thumbs-up.json'
import LOST from '../../../../../assets/rendle/rendle_game/little-boy-crying.json'
import DONE from '../../../../../assets/rendle/rendle_game/little-boy-with-a-pointing-stick.json'

const defaultOptions_WON = {
  loop: true, autoplay: true, animationData: WON, rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};
const defaultOptions_LOST = {
  loop: true, autoplay: true, animationData: LOST, rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const defaultOptions_DONE = {
  loop: true, autoplay: true, animationData: DONE, rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};


export const GameModal = ({ isOpen, handleClose, isGameLost, isGameWon, isGameFinished, type }) => {

  const Content = () => <div>
    {
      isGameFinished ? (<div>
        <Lottie
          style={{ height: "20rem", width: "20rem", paddingbottom: "2rem" }}
          options={defaultOptions_DONE}
        />
        <h2>You already participated in this contest, stay tuned for results.</h2>
      </div>
      ) : null
    }
    {
      isGameLost && !isGameFinished ? (
        <div>
          <Lottie
            style={{ height: "20rem", width: "20rem", paddingBottom: "2rem" }}
            options={defaultOptions_LOST}
          />
          <h2>Better Luck next time!</h2>
        </div>
      ) : null
    }
    {
      isGameWon && !isGameFinished ? (
        <div>
          <Lottie
            style={{ height: "20rem", width: "20rem", paddingBottom: "2rem" }}
            options={defaultOptions_WON}
          />
          <h2>Congrats you completed, resutls will be announced soon.</h2>
        </div>
      ) : null
    }
  </div>


  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent color={"white"} bg={"#321e43"} borderRadius="3xl">
          <ModalHeader textAlign={"center"} fontSize={"2xl"}>
            Try Next Rendle!
          </ModalHeader>
          <ModalCloseButton bg={"#321e43"} color={"color"} _hover={{ bg: "white", color: "#321e43" }} />
          <ModalBody textAlign={"center"} fontSize={"larger"} >
            <Content />
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Box
              marginBottom={"2"}
              fontSize="2xl"
              cursor={"pointer"}
              fontWeight="bold" borderRadius="2xl" py={3} px={12} _hover={{
                bg: "white", color: "#321e43"
              }} className="username" onClick={handleClose}>
              Okay
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
