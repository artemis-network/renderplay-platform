import Logo from '../../assets/logo.webp'
// import Loan from '../../assets/icons/loan.svg'
import Chip from '../../assets/icons/chip.svg'
import Hunt from '../../assets/icons/hunt-talent.svg'
import Pic from '../../assets/icons/draw.svg'
import { Link } from 'react-router-dom'

import './Sidebar.css'

const Sidebar = () => {
	const items = [
		{
			name: 'Wordle',
			path: '/',
			icon: Chip
		},
		{
			name: 'Scavenger Hunt',
			path: "/scavenger-hunt",
			icon: Hunt
		},
		{
			name: 'Pictionary',
			path: '/pictionary',
			icon: Pic
		}
	]
	return (

		<div>
			<section className="side_bar_fonts">
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", rowGap: "1rem" }}>
					<div style={{ padding: "1rem 1rem", display: "flex", columnGap: '1rem' }}>
						<img src={Logo} alt="logo" height={40} width={40} />
						<div className="custom__icon_text main__text" style={{}}>RenderPlay</div>
					</div>

					<div style={{ color: "#919EAB", display: "flex", justifyContent: "flex-start", fontWeight: "bold", padding: "1.5rem 0rem 1.5rem 2rem" }}>
						Games
					</div>

					<div style={{ display: "flex", rowGap: "2.4rem", flexDirection: "column" }}>
						{items.map((item, index) => {
							return <Link to={item.path} key={index} className="custom__icon">
								<img src={item.icon} alt="deposit" height={30} width={30} />
								<div className='custom__icon_text'>{item.name} </div>
							</Link>
						})}
					</div>

				</div>
			</section >
		</div >
	)
}

export default Sidebar