import React from 'react'
import Crossword from '@jaredreisinger/react-crossword';
import Bar from '../common/bar/Bar';

const data = {
	across: {
		1: {
			clue: 'one plus one',
			answer: 'TWO',
			row: 1,
			col: 0,
		},
	},
	down: {
		2: {
			clue: '?',
			answer: 'WHO',
			row: 1,
			col: 1,
		},
		3: {
			clue: 'three minus two',
			answer: 'ONE',
			row: 1,
			col: 2,
		},
		4: {
			clue: 'birds builds',
			answer: 'NEST',
			row: 2,
			col: 2,
		},
		5: {
			clue: 'persnolity trait',
			answer: 'HONEST',
			row: 0,
			col: 2,

		},
	},
}
const CrosswordComp = () => {
	return (
		<div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column", background: "#" }}>
			<Bar />

			<div style={{ margin: "10vh 0", height: "30vh", width: "30vw", display: "flex", alignSelf: "center", justifyContent: 'center', background: "white" }}>
				<Crossword data={data} />
			</div>
		</div>

	);
}

export default CrosswordComp;