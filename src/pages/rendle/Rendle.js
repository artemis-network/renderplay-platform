
import React, { useEffect, useState, lazy } from 'react'

import { Container } from 'react-bootstrap'
import { loadRendleGames } from '../../service/rendles.service'

const ContestCard = lazy(() => import('./ContestCard'))
const Bar = lazy(() => import("../common/bar/Bar"))
const Footer = lazy(() => import("../common/footer/Footer"))



const Wordle = () => {

	const [rendleGameTypes, setRendleGameTypes] = useState({
		rendles: [], mobileViewRendles: []
	})
	useEffect(() => {
		loadRendleGames().then(({ rendles, mobileViewRendles }) => {
			setRendleGameTypes({
				rendles: [...rendles],
				mobileViewRendles: [...mobileViewRendles]
			})
		}).catch(err => console.log(err));
	}, [rendleGameTypes.rendles.length])

	return (<div >
		<div className="container__bg">
			<Bar isGame={false} />
			<Container>
				<div className="contest">
					{rendleGameTypes.rendles.map((game, i) => <div key={game._id} className={game.css}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>

				<div className="contest_mobile">
					{rendleGameTypes.mobileViewRendles.map((game, i) => <div key={game._id} className={game.css}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>
			</Container>
		</div>
		<Footer />
	</div>)
}
export default Wordle