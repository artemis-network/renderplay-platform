import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'

import WordleGame from '../../games/wordle/WordleGame'
import Header from '../../components/Header/Header'

import { AlertProvider } from '../../games/wordle/context/AlertContext'
import { InfoModal } from '../../games/wordle/components/modals/InfoModal'

import ContestCard from '../../components/wordle/ContestCard/ContestCard'
import Navbar from '../../components/wordle/Navbar/Navbar'
import { ScrollTrigger } from 'react-gsap'
import { gsap } from 'gsap'

import './Wordle.css'


const Wordle = () => {


	const items = [1, 2, 3, 4, 5, 6]

	const isCheck = () => {
		setIsOpen(!isOpen)
	}


	const [isOpen, setIsOpen] = useState(false)

	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

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

		< InfoModal
			isOpen={isInfoModalOpen}
			handleClose={() => setIsInfoModalOpen(false)}
		/>

		<Header />
		<Container fluid style={{ background: "#533E85" }}>
			<Row>
				{isOpen ? <Navbar setIsOpen={() => setIsOpen()} isOpen={isOpen} setIsInfoModalOpen={() => setIsInfoModalOpen()} /> :
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
				}
				<div >
					{isOpen ?
						<AlertProvider>
							<WordleGame />
						</AlertProvider>
						: <div className='contest'>
							{items.map((i) =>
								<ContestCard key={i} i={i} isCheck={() => isCheck()} />)}
						</div>}
				</div>
			</Row>
		</Container>


	</div>)
}
export default Wordle