import React, { useEffect, useState, lazy, useRef } from 'react'

import { Container } from 'react-bootstrap'
import { getRenderScanGameTypes } from '../../service/renderscan.service'

const ContestCard = lazy(() => import('./components/contest_card/ContestCard'))
const Bar = lazy(() => import("../common/bar/Bar"))

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
			<Container >
				<div className="horizontal_container" style={{ display: 'flex', justifyContent: 'center', padding: "6rem 2rem", columnGap: "1rem" }}>
					{renderScanGameTypes.map((game, i) => <div key={game.contestId} className={"x_panel"}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>
			</Container>
		</div>
	</div>)
}
export default Wordle