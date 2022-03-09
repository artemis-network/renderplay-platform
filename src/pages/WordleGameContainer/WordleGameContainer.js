
import { AlertProvider } from '../../games/wordle/context/AlertContext'
import { InfoModal } from '../../games/wordle/components/modals/InfoModal'
import { Navbar, Nav } from 'react-bootstrap'
import { InformationCircleIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import WordleGame from '../../games/wordle/WordleGame'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'

const WordleGameContainer = () => {
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	const history = useHistory()
	const back = () => {
		history.push("/wordle")
	}
	return (
		<div>
			<Header></Header>
			<Navbar style={{ background: "#151D3B", margin: "0", padding: "1rem" }} bg="" expand="lg">
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