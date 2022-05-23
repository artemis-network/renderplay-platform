
import React, { useEffect, useState, lazy } from 'react'

import { Container } from 'react-bootstrap'
import { loadRendleGames } from '../../service/rendles.service'

import { AlertProvider } from './game/context/AlertContext'


const ContestCard = lazy(() => import('./components/contest_card/ContestCard'))
const Bar = lazy(() => import("../common/bar/Bar"))
const Footer = lazy(() => import("../common/footer/Footer"))


import './Rendle.css'

const Wordle = () => {

	const [rendleGameTypes, setRendleGameTypes] = useState(
		{
			rendles: [],
			mobileViewRendles: []
		}
	)
	useEffect(() => {
		localStorage.removeItem("gameStateId")
		localStorage.removeItem("gameState")
		localStorage.removeItem("gameConfig")
		localStorage.removeItem("timer")
		loadRendleGames().then(({ rendles, mobileViewRendles }) => {
			setRendleGameTypes({
				rendles: [...rendles],
				mobileViewRendles: [...mobileViewRendles]
			})
		}).catch(err => console.log(err));
	}, [rendleGameTypes.rendles.length])

	return (<div >
		<AlertProvider>
			<div className="container__bg">
				<Bar isGame={false} />
				<Container>
					<div className="contest">
						{rendleGameTypes.rendles.map((game, i) => <div key={game.contestId} className={game.css}>
							<ContestCard  {...game} key={i} index={i} />
						</div>)}
					</div>

					<div className="contest_mobile">
						{rendleGameTypes.mobileViewRendles.map((game, i) => <div key={game.contestId} className={game.css}>
							<ContestCard  {...game} key={i} index={i} />
						</div>)}
					</div>
				</Container>
			</div>
			<Footer />
		</AlertProvider>
	</div>)
}
export default Wordle