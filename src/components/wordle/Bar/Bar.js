
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { Button, } from 'react-bootstrap'
import Logo from '../../../assets/logo.webp'

import './Bar.css'

const Bar = () => {

	const logout = () => {
		localStorage.removeItem("username")
		localStorage.removeItem("publicToken")
		localStorage.removeItem('accessToken')
		localStorage.removeItem('gameState')
		localStorage.removeItem('gameConfig')
		localStorage.removeItem('isResultPosted')
		localStorage.removeItem('gameStats')
		window.location.reload()
	}


	return <nav style={{ background: "#1A132F", padding: "1rem 3rem" }} className="navbar navbar-expand-lg">
		<div className="navbar-brand" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", columnGap: ".35rem" }}>
			<img src={Logo} width="30" height="30" alt=""></img>
			<div>Renderverse</div>
		</div>


		<div style={{ display: "flex", justifyContent: 'center' }} className="collapse navbar-collapse">
			<ul className="nav nav-pills justify-content-center" style={{ columnGap: "3rem" }}>
				<li className="nav-item" >
					<NavLink to={"/wordle"} className="nav-link NavLink" activeClassName=''>Wordle</NavLink>
				</li>
				<li className="nav-item">
					<div className="nav-link NavLink" >
						<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", rowGap: ".15rem" }}>
							<div style={{ display: "flex", justifyContent: "center" }}>
								Scavanger Hunt
							</div>
							<div style={{ display: "flex", justifyContent: "center", background: "white", borderRadius: "3vh", fontSize: ".8rem", }}>
								coming soon
							</div>
						</div>
					</div>
				</li>
				<li className="nav-item">
					<div className="nav-link NavLink" >
						<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", rowGap: ".15rem" }}>
							<div style={{ display: "flex", justifyContent: "center" }}>
								Lottery
							</div>
							<div style={{ display: "flex", justifyContent: "center", background: "white", borderRadius: "3vh", fontSize: ".8rem", padding: "0 1rem" }}>
								coming soon
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div style={{ display: "flex", justifyContent: "flex-end" }}>
			<form className="form-inline my-2 my-lg-0" style={{ display: 'flex', columnGap: "1rem" }}>
				<Button>Connect Wallet</Button>
				{localStorage.getItem("username") !== null ?
					<div style={{ display: "flex", flexDirection: "row" }}>
						<Button onClick={logout}>Logout</Button>
					</div>
					:
					<Link to="/login"><Button>Login</Button></Link>
				}
			</form>
		</div>
	</nav>
};

export default Bar