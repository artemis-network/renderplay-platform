import { lazy } from 'react'
import { AlertProvider } from '../../games/wordle/context/AlertContext'

const WordleGame = lazy(() => import("../../games/wordle/WordleGame"))
const Bar = lazy(() => import("../../components/wordle/Bar/Bar.js"))

const WordleGameContainer = () => {
	return (
		<div>
			<Bar isGame={true} />
			<AlertProvider>
				<WordleGame />
			</AlertProvider>
		</div>
	)
}

export default WordleGameContainer