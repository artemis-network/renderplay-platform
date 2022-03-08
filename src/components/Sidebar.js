import Logo from '../assets/logo.webp'
import Loan from '../assets/icons/loan.svg'
import Chip from '../assets/icons/chip.svg'
import Hunt from '../assets/icons/hunt-talent.svg'
import Pic from '../assets/icons/draw.svg'
import { Link } from 'react-router-dom'

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
						<div style={{ color: "#919EAB", fontSize: "2rem", fontWeight: "bold", lineHeight: "2.5rem" }}>RenderPlay</div>
					</div>
					<div style={{ display: "flex", columnGap: "1rem", padding: "0 0 0 3rem" }}>
						<img src={Loan} alt="deposit" height={40} width={40} />
						<Link to="/stake" style={{ textDecoration: "none", fontSize: "1.5rem", color: "#919EAB", fontWeight: "500", lineHeight: "3rem" }}>Stake</Link>
					</div>

					<div style={{ color: "#919EAB", display: "flex", justifyContent: "flex-start", fontWeight: "bold", padding: "1.5rem 0rem 1.5rem 2rem" }}>
						Games
					</div>

					<div style={{ display: "flex", rowGap: "2.4rem", flexDirection: "column" }}>
						{items.map((item, index) => {
							return <Link to={item.path} key={index} style={{
								display: "flex", columnGap: "1rem",
								textDecoration: "none",
								padding: "0 0 0 3rem",
							}}>
								<img src={item.icon} alt="deposit" height={30} width={30} />
								<div style={{ fontSize: "1.35rem", color: "#919EAB", fontWeight: "500", }}>{item.name} </div>
							</Link>
						})}
					</div>

				</div>
			</section >
		</div >
	)
}

export default Sidebar