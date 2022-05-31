import React, { useEffect, useState, lazy } from 'react'

import { Container } from 'react-bootstrap'
import { getRenderScanGameTypes } from '../../service/renderscan.service'

import Png1 from '../../assets/renderscan/1.png'
import Png2 from '../../assets/renderscan/2.png'
import Png3 from '../../assets/renderscan/3.png'
import Png4 from '../../assets/renderscan/4.png'
import Png5 from '../../assets/renderscan/5.png'
import Png6 from '../../assets/renderscan/6.png'
import Png7 from '../../assets/renderscan/7.png'
import Png8 from '../../assets/renderscan/8.png'
import Png9 from '../../assets/renderscan/9.png'
import Line from '../../assets/rendle/rendle/line1.webp'

const ContestCard = lazy(() => import('../rendle/components/contest_card/ContestCard'))
const Bar = lazy(() => import("../common/bar/Bar"))
const Footer = lazy(() => import("../common/footer/Footer"))

import './RenderScan.css'

const Wordle = () => {

	const [renderScanGameTypes, setRenderScanGameTypes] = useState(
		{
			renderscans: [
				{ img: Png1, line: Line },
				{ img: Png2, line: Line },
				{ img: Png3, line: Line },
				{ img: Png4, line: Line },
				{ img: Png5, line: Line },
				{ img: Png6, line: Line },
				{ img: Png7, line: Line },
				{ img: Png8, line: Line },
				{ img: Png9, line: Line },
			],
		}
	)
	useEffect(() => {
		getRenderScanGameTypes()
			.then((response) => {
				console.log(response)
			}).catch(err => console.log(err))

	}, [renderScanGameTypes.length])

	return (<div >
		<div className="container__bg">
			<Bar isGame={false} />
			<Container>
				<div className="contest">
					{renderScanGameTypes.renderscans.map((game, i) => <div key={game.contestId} className={game.css}>
						<ContestCard  {...game} key={i} index={i} />
					</div>)}
				</div>
			</Container>
		</div>
		<Footer />
	</div>)
}
export default Wordle