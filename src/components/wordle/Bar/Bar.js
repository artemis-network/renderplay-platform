/* eslint-disable */
/* eslint-disable react/no-direct-mutation-state */
import { useEffect, useState } from "react";

import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom'

import Logo from '../../../assets/logo.webp'
import Coin from '../../../assets/coin.webp'
import './Bar.css'

import CustomDropDown from "./DropDown";
import Wallet from './Wallet'

import { get_wallet } from '../../../service/game.service'
import { ArrowLeftIcon } from "@heroicons/react/outline";

import Random from '../../../assets/5rendle.webp'

const Bar = (props) => {

	const history = useHistory()
	const back = () => history.push("/rendle")

	const [toggle, setToggle] = useState(false)
	const [toggleClass, setToggleClass] = useState({
		zIndex: 3,
		position: "absolute",
		transform: "translateY(-50rem)",
		visibility: "visible",
		transition: "all 0.5s"
	}
	)
	const [wallet, setWallet] = useState({
		id: null,
		balance: 0
	})

	const [img, setImg] = useState(Random)
	let gameConfig = localStorage.getItem("gameConfig")
	useEffect(() => {
		if (gameConfig !== null) {
			gameConfig = JSON.parse(gameConfig)
			return setImg(gameConfig.banner)
		}
		return setImg(Random)
	}, [])

	const data = { username: localStorage.getItem("username") }
	useEffect(() => {
		if (data.username !== null) {
			get_wallet(data)
				.then((res) => {
					setWallet({
						id: res.data.wallet.id,
						balance: res.data.wallet.balance
					})
				})
		}
	}, [])

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
				<XIcon onClick={toggleNav} style={{ display: "block", float: "right", margin: "1rem" }} className="p-1 w-12 h-12 neu" color="white" />
				<div className="side_bar__content" style={{ rowGap: "2rem" }}>
					<Link className='neu neu_link' onClick={toggleNav} to="/rendle">Rendle</Link>
					<Link className="neu neu_link" onClick={toggleNav} to="/sc">Scavenger Hunt</Link>
					<Link className="neu neu_link" onClick={toggleNav} to="/lottery">Lottery</Link>
					{localStorage.getItem("username") !== null ?
						<Link to="/" className='neu neu_link' onClick={logout}>Logout</Link>
						:
						<Link className="neu neu_link no_border" onClick={toggleNav} to="/login">Login</Link>
					}
				</div>
			</div>
		</div>
		<nav style={{ background: "#6D1DAF", padding: "1rem ", gridTemplateColumns: "1fr 2fr 1fr", minHeight: "10.5vh" }} className="nav_desktop" >
			<Link to="/rendle" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: ".5rem", alignItems: "center" }}>
				{!props.isGame ? <img src={Logo} width="30" alt=""></img> : null}
				{!props.isGame ? <div>Renderverse</div> :
					<div className="neu neu_end">
						<ArrowLeftIcon
							color='white'
							className="h-10 w-10 mx-0 cursor-pointer dark:stroke-white no_border"
							onClick={back}
						/>
					</div>
				}
			</Link>
			{
				!props.isGame ?
					<div className='neu' style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "auto", margin: "auto", columnGap: "3rem" }}>
						<NavLink className="neu_link" activeClassName='neu_link__active' to={"/rendle"} >Rendle</NavLink>
						<NavLink className="neu_link" activeClassName='neu_link__active' to={"/sc"} >Scavenger Hunt</NavLink>
						<NavLink className="neu_link" activeClassName='neu_link__active' to={"/lottery"} >Lottery</NavLink>
					</div> : <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "auto", margin: "auto", columnGap: "3rem" }} >
						<img src={img} alt="img" width={"350px"} height="250px" style={{ display: "flex", alignSelf: "center" }} />
					</div>
			}

			<div style={{ display: "flex", justifyContent: "flex-end", columnGap: "2rem", alignItems: "center" }} >
				<Wallet />
				{localStorage.getItem("username") !== null ?
					<CustomDropDown />
					:
					<NavLink to={"/login"} className="neu neu_end no_border" activeClassName='neu_active'>Login</NavLink>
				}
			</div>
		</nav>
		<div className='nav_mobile'>
			<div style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: "2rem", alignItems: "center", width: "100%", padding: "0 2rem" }}>
				{!props.isGame ? <div>Renderverse</div> :
					<div className="neu neu_end" style={{ padding: 0 }}>
						<ArrowLeftIcon
							color='white'
							className="h-8 w-6 mx-0 cursor-pointer dark:stroke-white no_border"
							onClick={back}
						/>
					</div>
				}
				{props.isGame ?
					<img src={img} alt="img" width={"350px"} height="250px" style={{ display: "flex", alignSelf: "center" }} />
					: null}
			</div>
			<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "0 1rem" }}>
				<MenuIcon onClick={toggleNav} className="neu rounded-xl p-1 w-12 h-12 cursor-pointer" color="white" />
			</div>
		</div>
		{localStorage.getItem("username") && !props.isGame ?
			<div style={{ display: "flex", justifyContent: "flex-end", padding: "2rem 4rem" }}>
				<div className='username' style={{ display: "flex", justifyContent: "flex-end", color: "#fbd6d2", fontWeight: "bold", padding: "1rem", borderRadius: "1vh", alignItems: "center" }}>
					<img className="rounded-xl p-1 w-12 h-12 cursor-pointer" src={Coin} alt="coin" />
					<div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{wallet.balance} REND</div>
				</div>
			</div> : null
		}
	</div >
};

export default Bar