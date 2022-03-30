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
	const back = () => history.push("/rendle")
	return (
		<div>
			<Navbar style={{ background: "#0b1118", margin: "0", padding: "1rem" }} bg="" expand="lg">
				<Navbar.Toggle className="bg-light" />
				<Navbar.Collapse>
					<Nav.Link>
						<ArrowLeftIcon
							color='white'
							className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
							onClick={back}
						/>
					</Nav.Link>
					<Nav.Link>
						<InformationCircleIcon
							color='white'
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