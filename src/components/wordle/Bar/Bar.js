import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Button } from 'react-bootstrap'
import { MenuIcon, XIcon } from '@heroicons/react/solid';

import Logo from '../../../assets/logo.webp'

import './Bar.css'

const Bar = () => {

	const [toggle, setToggle] = useState(false)
	const [toggleClass, setToggleClass] = useState({
		zIndex: 3,
		position: "absolute",
		transform: "translateY(-50rem)",
		visibility: "visible",
		transition: "all 0.5s"
	}
	)

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

	const toggleNav = () => {
		if (toggle) setToggleClass({
			zIndex: 3,
			position: "absolute",
			transform: "translateY(-50rem)",
			visibility: "visible",
			transition: "all 0.5s"
		})
		else setToggleClass({
			zIndex: 3,
			position: "absolute",
			visibility: "visible",
			transition: "all 0.5s"
		})
		setToggle(!toggle)
	}

	return <div>
		<div style={toggleClass} >
			<div className="side_bar">
				<XIcon onClick={toggleNav} style={{ display: "block", background: "black", float: "right", margin: "1rem" }} className="shadow-m rounded-xl p-1 w-12 h-12 cursor-pointer" color="white" />
				<div className="side_bar__content">
					<Link onClick={toggleNav} to="/Wordle"><Button variant="outline-primary">Wordle</Button></Link>
					<Link onClick={toggleNav} to="/"><Button variant="outline-primary">Scavenger Hunt</Button></Link>
					<Link onClick={toggleNav} to="/"><Button variant="outline-primary">Lottery</Button></Link>
					{localStorage.getItem("username") !== null ?
						<Button variant="outline-primary" onClick={logout}>Logout</Button>
						:
						<Link onClick={toggleNav} to="/login"><Button variant="outline-primary">Login</Button></Link>
					}
				</div>
			</div>
		</div>
		<nav style={{ background: "#1A132F", padding: "1rem 3rem" }} className="navbar navbar-expand-lg">
			<div className="navbar-brand" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", columnGap: ".35rem" }}>
				<img src={Logo} width="30" height="30" alt=""></img>
				<div>Renderverse</div>
			</div>


			<div className="collapse navbar-collapse nav_end__mid_desktop">
				<ul className="nav nav-pills justify-content-center" style={{ columnGap: "3rem" }}>
					<li className="nav-item" >
						<NavLink to={"/wordle"} className="nav-link NavLink" activeClassName='active'>Wordle</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={"/sc"} className="nav-link NavLink" activeClassName='active'>Scavenger Hunt</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to={"/lottery"} className="nav-link NavLink" activeClassName='active'>Lottery</NavLink>
					</li>
				</ul>
			</div>

			<div className="nav_end__items_desktop">
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

			<div className='nav_end__items_mobile'>
				<MenuIcon onClick={toggleNav} style={{ background: "white" }} className="shadow-m rounded-xl p-1 w-12 h-12 cursor-pointer" color="black" />
			</div>
		</nav>
	</div>
};

export default Bar