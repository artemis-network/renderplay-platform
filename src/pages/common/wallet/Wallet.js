/* eslint-disable */
/* eslint-disable react/no-direct-mutation-state */
import {
  ChakraProvider,
  useDisclosure,
  Button,
  Box,
  Text,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { DAppProvider } from "@usedapp/core";
import { useEffect, useRef } from "react";
import Jazzicon from "@metamask/jazzicon";
import styled from "@emotion/styled";
import { useState } from 'react'
import "@fontsource/inter";


function AccountModal({ isOpen, onClose }) {
  const { account, deactivate } = useEthers();

  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="white"
          fontSize="sm"
          _hover={{
            color: "whiteAlpha.700",
          }}
        />
        <ModalBody pt={5} px={4} style={{ minHeight: "28vh" }}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Connected with MetaMask
              </Text>
              <Button
                variant="outline"
                size="sm"
                borderColor="blue.800"
                borderRadius="3xl"
                color="blue.500"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{
                  background: "none",
                  borderColor: "blue.300",
                  textDecoration: "underline",
                }}
                onClick={handleDeactivateAccount}
              >
                Disconnect
              </Button>
            </Flex>

            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Identicon />
              <Text
                color="white"
                fontSize="sm"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={3}>
              <Button
                variant="link"
                color="gray.400"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: "none",
                  color: "whiteAlpha.800",
                }}
              >
                <CopyIcon mr={1} />
                Copy Address
              </Button>
              <Link
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={`https://ropsten.etherscan.io/address/${account}`}
                isExternal
                color="gray.400"
                ml={6}
                _hover={{
                  color: "whiteAlpha.800",
                  textDecoration: "underline",
                }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </Link>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent="end"
          background="gray.700"
          borderBottomLeftRadius="3xl"
          borderBottomRightRadius="3xl"
          p={6}
        >
          <Text
            color="white"
            textAlign="left"
            fontWeight="medium"
            fontSize="md"
          >
            Your transactions willl appear here...
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}


const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`;

function Identicon() {
  const ref = useRef();
  const { account } = useEthers();

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
  }, [account]);

  return <StyledIdenticon ref={ref} />;
}



function Wallet() {
  function ConnectButton({ handleOpenModal }) {
    const { activateBrowserWallet, account, chainId, deactivate } = useEthers();
    const etherBalance = useEtherBalance(account);
    localStorage.setItem("metaMaskWalletAddress", account)


    const [isWrongNetwork, setIsWrongNetwork] = useState(false)

    function handleConnectWallet() {
      activateBrowserWallet();
    }

    function changeNetwork() {
    }

    useEffect(() => {
      try {
        if (chainId === 56) return setIsWrongNetwork(false)
        return setIsWrongNetwork(true)
      } catch (e) {
        console.log(e)
        return setIsWrongNetwork(true)
      }
    }, [chainId])

    return account !== undefined ? (
      <Box
        display="flex"
        alignItems="center"
        background="gray.700"
        borderRadius="xl"
        py="0"
      >
        {!isWrongNetwork ?

          <Box
            display="flex"
            alignItems="center"
            background="gray.700"
            borderRadius="xl"
            py="0"
          >
            <Box px="3">
              <Text color="white" fontSize="sm">
                {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} BNB
              </Text>
            </Box>
            <Button
              onClick={handleOpenModal}
              bg="gray.800"
              border="1px solid transparent"
              _hover={{
                border: "1px",
                borderStyle: "solid",
                borderColor: "blue.400",
                backgroundColor: "gray.700",
              }}
              borderRadius="xl"
              m="1px"
              px={3}
              height="38px"
            >
              <Text color="white" fontSize="sm" fontWeight="medium" mr="2">
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
              <Identicon />
            </Button>
          </Box> : <Box onClick={() => changeNetwork()} borderRadius={"xl"} background={"#F24A72"} p="2" _hover={{
            background: "#F46688"
          }}>
            <Text color="white" fontSize="sm" fontWeight={"bold"} >
              Wrong network,
            </Text>
            <Text color="white" fontSize="sm" fontWeight={"bold"} >
              connect to BSC Mainnet
            </Text>
          </Box>
        }
      </Box>
    ) : (
      <Button
        className="neu neu_end no_border neu_link"
        style={{ fontSize: "1.25rem", fontWeight: "bold", padding: "1.5rem 1.6rem" }}
        onClick={handleConnectWallet}
        bg="#651CA3"
        color="#F2CAD0"
        _hover={{
          background: "#651CA3",
          border: 0
        }}
        _active={{
          background: "#651CA3",
          border: 0
        }}
      >
        Connect Wallet
      </Button>
    );
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <DAppProvider config={{}}>
      <ChakraProvider  >
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </ChakraProvider>
    </DAppProvider>
  );
}

export default Wallet;