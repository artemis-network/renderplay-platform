import React from 'react'
import { Container, Row } from 'react-bootstrap'

import Header from '../../components/Header/Header'


import ContestCard from '../../components/wordle/ContestCard/ContestCard'
import { ScrollTrigger } from 'react-gsap'
import { gsap } from 'gsap'

import './Wordle.css'

const Wordle = () => {
	const items = [1, 2, 3, 4, 5, 6]

	gsap.registerPlugin(ScrollTrigger);
	let sections = gsap.utils.toArray(".contest_card");
	gsap.to(sections, {
		// xPercent: -100 * (sections.length - 1),
		// ease: "none",
		// scrollTrigger: {
		// 	trigger: ".contest",
		// 	pin: true,
		// 	scrub: 1,
		// 	snap: 1 / (sections.length - 1),
		// 	end: "+=3500",
		// }
	});



	return (<div>
		<Header />
		<Container fluid style={{ background: "#533E85" }}>
			<Row>
				<div style={{ padding: "1rem", background: "#1B1A17" }}>
					<ul class="nav justify-content-center">
						<li class="nav-item">
							<button class="nav-link active" aria-current="page">Wordle</button>
						</li>
						<li class="nav-item">
							<button class="nav-link">Scavanger Hunt</button>
						</li>
						<li class="nav-item">
							<button class="nav-link">Pictography</button>
						</li>
					</ul>
				</div>
				<div>
					<div className='contest'>
						{items.map((i) => <ContestCard key={i} gameConfig={i}></ContestCard>)}
					</div>
				</div>
			</Row>
		</Container>


	</div>)
}
export default Wordle