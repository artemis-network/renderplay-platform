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
					<Link onClick={toggleNav} to="/Wordle"><Button variant="outline-primary">Rendle</Button></Link>
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
		<nav style={{ background: "#6D1DAF", padding: "1rem ", gridTemplateColumns: "1fr 2fr 1fr", minHeight: "10vh" }} className="nav_desktop" >
			<a href="https://renderverse.io" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: ".5rem", alignItems: "center" }}>
				<img src={Logo} width="30" alt=""></img>
				<div>Renderverse</div>
			</a>
			<div className='neu' style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "auto", margin: "auto", columnGap: "3rem" }}>
				<NavLink className="neu_link" activeClassName='neu_link__active' to={"/rendle"} >Rendle</NavLink>
				<NavLink className="neu_link" activeClassName='neu_link__active' to={"/sc"} >Scavenger Hunt</NavLink>
				<NavLink className="neu_link" activeClassName='neu_link__active' to={"/lottery"} >Lottery</NavLink>
			</div>

			<div style={{ display: "flex", justifyContent: "flex-end", columnGap: "2rem" }} >
				<NavLink to={"/connect-wallet"} className="neu neu_end" activeClassName='neu_active'>Connect Wallet</NavLink>
				{localStorage.getItem("username") !== null ?
					<div className="neu neu_end" onClick={logout}>Logout</div>
					:
					<NavLink to={"/login"} className="neu neu_end" activeClassName='neu_active'>Login</NavLink>
				}
			</div>
		</nav>
		<div className='nav_mobile'>
			<div style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: ".5rem", alignItems: "center", width: "100%", padding: "0 2rem" }}>
				<img src={Logo} width="30" alt=""></img>
				<div>Renderverse</div>
			</div>
			<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "0 1rem" }}>
				<MenuIcon onClick={toggleNav} style={{ background: "white" }} className="shadow-m rounded-xl p-1 w-12 h-12 cursor-pointer" color="black" />
			</div>
		</div>
		{localStorage.getItem("username") ?
			<div style={{ display: "flex", justifyContent: "flex-end", padding: "2rem 4rem" }}>
				<div className='username' style={{ display: "flex", justifyContent: "flex-end", color: "#fbd6d2", fontWeight: "bold", padding: "1rem", borderRadius: "1vh" }}>
					Welcome {localStorage.getItem("username")}!
				</div>
			</div> : null
		}
	</div >
};

export default Bar