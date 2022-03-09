import { Navbar, Nav } from 'react-bootstrap'
import { InformationCircleIcon, BackspaceIcon } from '@heroicons/react/outline'

const WordleNavbar = (props) => {
	return (
		<Navbar style={{ background: "#151D3B" }} bg="" expand="lg">
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<BackspaceIcon
					className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
					onClick={() => props.setIsOpen(!props.isOpen)}
				/>
				<Nav.Link>
					<InformationCircleIcon
						className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
						onClick={() => props.setIsInfoModalOpen(true)}
					/>
				</Nav.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default WordleNavbar