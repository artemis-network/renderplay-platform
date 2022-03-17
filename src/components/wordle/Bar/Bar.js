
import Logo from '../../../assets/logo.webp'
import { NavLink } from 'react-router-dom'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { InfoModal } from '../../../games/wordle/components/modals/InfoModal'
import { useState } from 'react';
import './Bar.css'

const Bar = () => {

	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
	return <div>
		<div style={{ background: "#1A132F", padding: "1rem" }}>
			<ul className="nav nav-pills justify-content-center">
				<li className="nav-item" >
					<NavLink to={"/wordle"} className="nav-link NavLink" activeClassName='active'>Wordle</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={"/sh"} className="nav-link NavLink" activeClassName='active'>Scavanger Hunt</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to={"/pic"} className="nav-link NavLink" activeClassName='active'>Pictography</NavLink>
				</li>
			</ul>
		</div>
		<div className='timer__container'>
			< InfoModal
				isOpen={isInfoModalOpen}
				handleClose={() => setIsInfoModalOpen(false)}
			/>
			<div className="first_item">
				<img src={Logo} alt="logo"></img>
				<div className='rndv'>$RNDV USD<div className='price'>$320</div></div>
			</div>

			<div>
				<QuestionMarkCircleIcon
					className="h-12 w-12 my-3 cursor-pointer dark:stroke-white"
					onClick={() => setIsInfoModalOpen(true)}
				/>
			</div>
		</div >
	</div>
};

export default Bar