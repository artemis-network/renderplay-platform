import React from 'react'
import Crossword from '@jaredreisinger/react-crossword';
import Bar from '../common/bar/Bar';
import './CrossWord.css'

const data = {
	across: {
		1: {
			clue: 'Question of self-doubt: 2wds',
			answer: 'CANI',
			row: 0,
			col: 1,
		},
		5: {
			clue: 'Westren Canadian Territory',
			answer: "YUKON",
			row: 1,
			col: 0
		},
		6: {
			clue: "Martini add-in",
			answer: "OLIVE",
			row: 2,
			col: 0
		},
		7: {
			clue: "Speak",
			answer: "UTTER",
			row: 3,
			col: 0
		},
		8: {
			clue: "Condiment in shakers",
			answer: "SALT",
			row: 4,
			col: 1
		},

	},
	down: {
		1: {
			clue: 'Religious sects',
			answer: 'CULT',
			row: 0,
			col: 1,
		},
		2: {
			clue: 'Japanese dog',
			answer: 'AKITA',
			row: 0,
			col: 2
		},
		3: {
			clue: 'Book of fiction',
			answer: 'NOVEL',
			row: 0,
			col: 2,
		},
		4: {
			clue: 'Motionless',
			answer: 'INERT',
			row: 0,
			col: 4,
		},
		5: {
			clue: 'Last word of happy birthday song',
			answer: 'YOU',
			row: 1,
			col: 0,
		},


	},
}
const CrosswordComp = () => {
	return (
		<div style={{ height: "100vh", background: '#321e43', width: "100vw", display: "flex", flexDirection: "column", alignContent: 'center' }}>
			<Bar />
			<div style={{ padding: "5vh", columnGap: "3rem", height: "40vh", width: "50vw", display: "flex", flexDirection: "row", justifyContent: "center", alignSelf: "center", }}>
				<Crossword
					theme={{
						cellBackground: "#6d1daf",
						gridBackground: "#fbd6d2",
						cellBorder: "#fbd6d2",
						columnBreakpoint: "",
						focusBackground: "#321e43",
						highlightBackground: "#321e43",
						numberColor: "#fbd6d2",
						textColor: "#fbd6d2"
					}}
					data={data}>
				</Crossword>
			</div>
		</div >

	);
}

export default CrosswordComp;