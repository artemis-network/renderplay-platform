import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap'
import { AlertProvider } from '../../games/wordle/context/AlertContext'

import { InfoModal } from '../../games/wordle/components/modals/InfoModal'
import { InformationCircleIcon, ArrowLeftIcon } from '@heroicons/react/outline'

import WordleGame from '../../games/wordle/WordleGame'

const WordleGameContainer = () => {
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	const history = useHistory()
	const back = () => history.push("/wordle")
	return (
		<div>
			<Navbar style={{ background: "#321E43", margin: "0", padding: "1rem" }} bg="" expand="lg">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav.Link>
						<ArrowLeftIcon
							className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
							onClick={back}
						/>
					</Nav.Link>
					<Nav.Link>
						<InformationCircleIcon
							className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
							onClick={() => setIsInfoModalOpen(true)}
						/>
					</Nav.Link>
				</Navbar.Collapse>
			</Navbar>
			< InfoModal
				isOpen={isInfoModalOpen}
				handleClose={() => setIsInfoModalOpen(false)}
			/>
			<AlertProvider>
				<WordleGame />
			</AlertProvider>
		</div>
	)
}

export default WordleGameContainer