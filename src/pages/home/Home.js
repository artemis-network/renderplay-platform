import { Box, Flex, Grid, Text, GridItem } from '@chakra-ui/react'
import { useHistory } from 'react-router'

import Wordle from '../../assets/game_thumbs/wordle.png'
import Quardle from '../../assets/game_thumbs/quordle.webp'
import Hurdle from '../../assets/game_thumbs/hurdle.png'
import AntiWordle from '../../assets/game_thumbs/antiwordle.png'
import Lewdle from '../../assets/game_thumbs/lewdle.png'
import CrossWordle from '../../assets/game_thumbs/crosswordle.jpeg'
import Nerdle from '../../assets/game_thumbs/nerdle.png'
import Absurdle from '../../assets/game_thumbs/absurdle.png'
import Heardle from '../../assets/game_thumbs/heardle.png'
import Lookdle from '../../assets/game_thumbs/lookdle.jpeg'
import Framed from '../../assets/game_thumbs/framed.jpeg'
import Semantle from '../../assets/game_thumbs/semantle.jpeg'
import Redactle from '../../assets/game_thumbs/redactle.jpeg'
import Spellbound from '../../assets/game_thumbs/spellbound.jpeg'
import Primel from '../../assets/game_thumbs/primel.png'
import Waffle from '../../assets/game_thumbs/waffle.jpeg'
import CrossWord from '../../assets/game_thumbs/crossword.jpeg'
import WordScramble from '../../assets/game_thumbs/wordscramble.jpeg'

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
		"Wordles 5", "Wordle 6", "Wordle 7", "Quordle", "Hurdle",
		"Anti Wordle", "Lewdle", "Cross Wordle", "Nerdle", "Absurdle",
		"Heardle", "Lookdle", "Framed", "Semantle", "Redactle",
		"Spelle (Spell Bound)", "Primel", "Waffle", "Cross Word", "Word Scramble",
	]

	const images = [
		Wordle, Wordle, Wordle, Quardle, Hurdle,
		AntiWordle, Lewdle, CrossWordle, Nerdle, Absurdle,
		Heardle, Lookdle, Framed, Semantle, Redactle,
		Spellbound, Primel, Waffle, CrossWord, WordScramble,
	]

	function goToPage(item, index) {
		console.log(item, index)
		if (item == 1) {
			if (index === 0) {
				history.push("/rendle")
			}
			if (index === 1) [
				history.push("/crossword")
			]
		}
	}
	return <div style={{ background: "#321e43", fontFamily: "quicksand", padding: "5rem" }}>
		<Box bgColor={"#6d1daf"} display={"flex"} p={"8"} rowGap={"2rem"} flexDirection="column" borderRadius={"2xl"} color="#fbd6d2" >
			<Flex flexDirection={"column"} py="4">
				<Text fontSize={"3xl"} fontWeight="bold">Welcome to Renderverse</Text>
				<Text fontWeight={"bold"}>Web3 Games, NFT, Community & Earnings</Text>
			</Flex>
			<Flex flexDirection={"column"}>
				<Box bgColor={"#321e43"} fontWeight="bold" p="3" borderTopRadius={"2xl"} width={"15%"} textAlign="center">
					<Text>Gameinfinity Web3 Games</Text>
				</Box>
				<Box bgColor={"#321e43"} p="12" borderBottomRadius={"2xl"} borderTopRightRadius={"2xl"}>
					<Grid templateColumns='repeat(5, 1fr)' gap={6}>
						{gridItems.map((grid, index) =>
							<GridItem onClick={() => goToPage(grid, index)} position={"relative"} key={index} w='100%' h='52' backgroundSize={"cover"} backgroundRepeat={"no-repeat"} backgroundImage={images[index]} borderRadius={"2xl"}>
								{
									gridGames[index] !== "" ? <Box display={"flex"} justifySelf="center" alignSelf={"center"}>
										<Box p="2" m="2" bg="#321e43" borderRadius={"2xl"}>
											<Text fontWeight={"bold"} fontSize="medium"  >{gridGames[index]}</Text>
										</Box>
									</Box> : null
								}
								{grid == 0 ?
									<Box position={"absolute"} bottom="2" right={"2"}>
										<Box bg="#321e43" px={"3"} py="2" borderRadius={"2xl"}>
											<Text fontWeight={"bold"}>
												Comming Soon
											</Text>
										</Box>
									</Box>
									: null}
								{grid == 1 ?
									<Box position={"absolute"} bottom="2" right={"2"}>
										<Box bg="#321e43" px={"3"} py="2" borderRadius={"2xl"}>
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