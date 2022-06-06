import React, { useEffect, useState, lazy } from 'react'

import { Container } from 'react-bootstrap'
import { getRenderScanGameTypes } from '../../service/renderscan.service'
import gsap from 'gsap';
import { ScrollTrigger } from 'react-gsap'

const ContestCard = lazy(() => import('../rendle/components/contest_card/ContestCard'))
const Bar = lazy(() => import("../common/bar/Bar"))
const Footer = lazy(() => import("../common/footer/Footer"))

import './RenderScan.css'

const Wordle = () => {

	const [renderScanGameTypes, setRenderScanGameTypes] = useState([])
	useEffect(() => {

		// gsap.registerPlugin(ScrollTrigger);

		// let sections = gsap.utils.toArray(".contest_game_card");

		// gsap.to(sections, {
		// 	xPercent: -100 * (sections.length - 1),
		// 	ease: "none",
		// 	scrollTrigger: {
		// 		trigger: ".contest_scroll",
		// 		pin: true,
		// 		scrub: 1,
		// 		snap: 1 / (sections.length - 1),
		// 		end: () => "+=" + document.querySelector(".contest_scroll").offsetWidth
		// 	}
		// });


		getRenderScanGameTypes()
			.then((response) => {
				setRenderScanGameTypes([...response])
			}).catch(err => console.log(err))

	}, [renderScanGameTypes.length])

	return (<div >
		<div className="container__bg">
			<Bar isGame={false} />
			<Container>
				<div className="contest contest_scroll">
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