import { Box, Flex, Grid, Text, GridItem } from '@chakra-ui/react'
import { useHistory } from 'react-router'

const Home = () => {

	const history = useHistory();

	const gridItems = [
		1, 1, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, 0,
	]

	const gridGames = [
		"Rendles", "CrossWord", "2048", "Hetrix",
		"Snake", "Bubble Shoot", "	Tetris", "Tennis",
		"Brick Breaker", "Carrom", "8 Ball Pool", "Football",
		"Ninja Hands", "Cricket", "Slash", "Royale",
		"Maze", "Discover", "Zombie", "Drag Race",
	]
	function goToPage(item, index) {
		if (item == 0) {
			if (index == 1) {
				history.push("/rendle")
			} else[
				history.push("/crossword")
			]
		}
	}
	return <div style={{ background: "#4C0033", fontFamily: "quicksand", padding: "5rem" }}>
		<Box bgColor={"#790252"} display={"flex"} p={"8"} rowGap={"2rem"} flexDirection="column" borderRadius={"2xl"} color="#fbd6d2" >
			<Flex flexDirection={"column"} p="12">
				<Text fontSize={"3xl"} fontWeight="bold">Welcome to Renderverse</Text>
				<Text fontWeight={"bold"}>Web3 Games, NFT, Community & Earnings</Text>
			</Flex>
			<Flex flexDirection={"column"}>
				<Box bgColor={"#4C0033"} fontWeight="bold" p="3" borderTopRadius={"2xl"} width={"15%"} textAlign="center">
					<Text>Gameinfinity Web3 Games</Text>
				</Box>
				<Box bgColor={"#4C0033"} p="12" borderBottomRadius={"2xl"} borderTopRightRadius={"2xl"}>
					<Grid templateColumns='repeat(5, 1fr)' gap={6}>
						{gridItems.map((grid, index) =>
							<GridItem onClick={() => goToPage(grid, index)} position={"relative"} key={index} w='100%' h='64' bg='#790252' borderRadius={"2xl"}>
								{
									gridGames[index] !== "" ? <Box display={"flex"} justifySelf="center" alignSelf={"center"}>
										<Text fontWeight={"bold"} fontSize="3xl" p="4">{gridGames[index]}</Text>
									</Box> : null
								}
								{grid == 0 ?
									<Box position={"absolute"} bottom="2" right={"2"}>
										<Box bg="#4C0033" px={"3"} py="2" borderRadius={"2xl"}>
											<Text fontWeight={"bold"}>
												Comming Soon
											</Text>
										</Box>
									</Box>
									: null}
								{grid == 1 ?
									<Box position={"absolute"} bottom="2" right={"2"}>
										<Box bg="#4C0033" px={"3"} py="2" borderRadius={"2xl"}>
											<Text fontWeight={"bold"}>
												Play Now
											</Text>
										</Box>
									</Box>
									: null}
							</GridItem>)}
					</Grid>
				</Box>
			</Flex>
		</Box >

	</div >
}

export default Home