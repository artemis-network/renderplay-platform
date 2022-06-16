import {
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
	Button
} from '@chakra-ui/react'

const Dialog = (props) => {

	if (!props.show) return null

	return (
		<>
			<Modal isOpen={props.show} onClose={props.close} isCentered>
				<ModalOverlay />
				<ModalContent color={"white"} bg={"#321e43"} borderRadius="3xl">
					<ModalHeader textAlign={"center"} fontSize={"2xl"}>{props.header}</ModalHeader>
					<ModalCloseButton bg={"#321e43"} color={"color"} _hover={{ bg: "white", color: "#321e43" }} />
					<ModalBody textAlign={"center"} fontSize={"large"} >
						{props.message}
					</ModalBody>
					<ModalFooter>
						<Button colorScheme='red' mr={3} onClick={props.action}>
							{props.buttonText}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Dialog 