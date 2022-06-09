import React, { useEffect, useState, lazy } from 'react'

import { Container } from 'react-bootstrap'
import { getRenderScanGameTypes } from '../../service/renderscan.service'

const ContestCard = lazy(() => import('./components/contest_card/ContestCard'))
const Bar = lazy(() => import("../common/bar/Bar"))
const Footer = lazy(() => import("../common/footer/Footer"))
import './RenderScan.css'

const Wordle = () => {

	const [renderScanGameTypes, setRenderScanGameTypes] = useState([])
	useEffect(() => {
		getRenderScanGameTypes()
			.then((response) => {
				setRenderScanGameTypes([...response])
			}).catch(err => console.log(err))
	}, [])


	return (<div >
		<div className="container__bg">
			<Bar isGame={false} />
			<Container>
				<div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", justifyContent: 'center', padding: "6rem 6rem", rowGap: "4rem", columnGap: "4rem" }}>
					{renderScanGameTypes.map((game, i) => <div key={game.contestId} className={game.css + " contest_game_card"}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>
			</Container>
		</div>
		<Footer />
	</div>)
}
export default Wordle