import React, { useState } from 'react'
import { Button, Navbar, Nav, Container, Row, Col } from 'react-bootstrap'

import WordleGame from '../games/wordle/WordleGame'
import Background from '../assets/background.jpg'
import Back from '../assets/icons/back-arrow.svg'
import Coin0 from '../assets/icons/win.svg'
import Coin from '../assets/coin.png'
import Coin2 from '../assets/icons/chip.svg'
import Timer from '../assets/icons/timer.svg'
import Countdown from 'react-countdown';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { AlertProvider } from '../games/wordle/context/AlertContext'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { InfoModal } from '../games/wordle/components/modals/InfoModal'


const Wordle = () => {

	const Completionist = () => <span>You are good to go!</span>;

	// Renderer callback with condition
	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			// Render a completed state
			return <Completionist />;
		} else {
			// Render a countdown
			return <span>{hours}:{minutes}:{seconds}</span>;
		}
	};

	const items = [1, 2, 3, 4, 5, 6]

	const isCheck = () => {
		setIsOpen(!isOpen)
	}


	const [isOpen, setIsOpen] = useState(false)

	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)


	return (<div>

		< InfoModal
			isOpen={isInfoModalOpen}
			handleClose={() => setIsInfoModalOpen(false)}
		/>

		<Container fluid>
			<Row style={{ backgroundColor: "#0a0b1c", minHeight: "100vh" }}>
				<Col style={{ padding: 0, backgroundColor: "#0a0b1c" }} sm={0} md={4} xxl={2}>
					<Sidebar />
				</Col>
				<Col style={{ padding: 0, background: `url(${Background})`, overflow: "hidden" }} sm={12} md={8} xxl={10}>
					<Header />
					{isOpen ? <Navbar style={{ background: "#0F172A" }} bg="" expand="lg">
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav.Link onClick={() => setIsOpen(!isOpen)}>
								<img height="100%" width="100%" alt='coin' src={Back} />
							</Nav.Link>
							<Nav.Link>
								<InformationCircleIcon
									className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
									onClick={() => setIsInfoModalOpen(true)}
								/>
							</Nav.Link>
						</Navbar.Collapse>
					</Navbar> : null}
					<div >
						{isOpen ?
							<AlertProvider>
								<WordleGame />
							</AlertProvider>
							: <div className='contest'>
								{items.map((i) => {
									return <div key={i} className='contest_card'>
										<div className="contest_card__image">
											<Button>New</Button>
											<img width="100%" alt='coin' src={Coin} />
										</div>
										<div className='contest_card__content'>
											<div className='c_item'>
												<div>
													<img src={Coin0} alt="coin2"></img>
													<div>2BNB</div>
												</div>
												<div>
													<img src={Coin2} alt="coin2"></img>
													<div>10 PTS</div>
												</div>

											</div>
											<div className='c_item'>
												<div>
													<img src={Timer} alt="coin2"></img>
													<div>  {"Starts in _  "}
														<Countdown renderer={renderer} date={Date.now() + 10000 * 100} />
													</div>

												</div>
											</div>
										</div>
										<div className='contest_card__action'>
											<Button onClick={isCheck}>Play Now</Button>
										</div>
									</div>
								})}
							</div>}
					</div>
				</Col>
			</Row>
		</Container>


	</div>)
}
export default Wordle