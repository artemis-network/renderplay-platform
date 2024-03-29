import { useEffect, useState } from "react";

import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom'

import Logo from '../../../assets/logo.webp'
import Coin from '../../../assets/coin.webp'
import Random from '../../../assets/rendle/rendle/5rendle.webp'

import { ArrowLeftIcon, ArrowNarrowLeftIcon, } from "@heroicons/react/outline";

import Wallet from '../wallet/Wallet'
import DropDown from "../drop_down/DropDown";
import MobileDropDown from "../drop_down/MobileDropDown";

import { getWallet } from '../../../service/user.service'



import './Bar.css'

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

	let topBarImg = localStorage.getItem("topBarImg")

	useEffect(() => {
		setImg(topBarImg)
	}, [])

	const data = { token: localStorage.getItem("accessToken") }

	useEffect(() => {
		if (data.token !== null) {
			getWallet(data)
				.then((res) => {
					setWallet({
						id: res.data._id,
						balance: res.data.balance
					})
				}).catch(err => console.log(err))
		}
	}, [])

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
					<MobileDropDown balance={wallet.balance} />
				</div>
			</div>
		</div>
		<nav style={{ background: "#6D1DAF", padding: "1rem ", gridTemplateColumns: "1fr 2fr 1fr", minHeight: "10.5vh" }} className="nav_desktop" >
			<Link to="/" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: ".5rem", alignItems: "center" }}>
				{!props.isGame ? <img src={Logo} width="30px" alt=""></img> : null}
				{!props.isGame ? <div>Renderverse</div> :
					<div className="neu neu_end">
						<ArrowLeftIcon
							color='white'
							className="h-8 w-8 mx-0 cursor-pointer dark:stroke-white no_border"
							onClick={back}
						/>
					</div>
				}
			</Link>
			{
				!props.isGame ?
					<div className='neu' style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "auto", margin: "auto", columnGap: "3rem" }}>
						<NavLink className="neu_link" exact strict activeClassName='neu_link__active' to={"/rendle"} >Rendle</NavLink>
						<NavLink className="neu_link" exact strict activeClassName='neu_link__active' to={"/crossword"} >Crossword</NavLink>
						<NavLink className="neu_link" activeClassName='neu_link__active' to={"/raffle"} >Raffle</NavLink>
					</div> : <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', width: "auto", margin: "auto", columnGap: "3rem" }} >
						<img src={img} alt="img" width={"350px"} height="250px" style={{ display: "flex", alignSelf: "center" }} />
					</div>
			}

			<div style={{ display: "flex", justifyContent: "flex-end", columnGap: "2rem", alignItems: "center" }} >
				<Wallet />
				{localStorage.getItem("accessToken") !== null ?
					<DropDown /> : <NavLink to={"/login"} className="neu neu_end no_border" activeClassName='neu_active'>Login</NavLink>
				}
			</div>
		</nav>
		<div className='nav_mobile'>
			<div style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: "2rem", alignItems: "center", width: "100%", padding: "0 2rem" }}>
				<Link to="/" style={{ color: "white", fontSize: "1.5rem", fontWeight: "bold", display: "flex", position: "relative", justifyContent: "flex-start", columnGap: ".5rem", alignItems: "center" }}>
					{!props.isGame ? <img src={Logo} width="30px" alt=""></img> : null}
					{!props.isGame ? <div>Renderverse</div> :
						<ArrowNarrowLeftIcon onClick={back} className="neu neu_end rounded-xl p-1 w-12 h-12 cursor-pointer" color="white" />
					}
				</Link>
				{props.isGame ?
					<img src={img} alt="img" width={"350px"} height="250px" style={{ display: "flex", alignSelf: "center", transform: "scale(1.1)" }} />
					: null}
			</div>
			<div style={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "0 1rem" }}>
				<MenuIcon onClick={toggleNav} className="neu rounded-xl p-1 w-12 h-12 cursor-pointer" color="white" />
			</div>
		</div>

		{localStorage.getItem("accessToken") && !props.isGame && !props.is_in_raffle ?
			<div style={{ position: "absolute", right: 0 }} className="balance">
				<div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 2rem", }}>
					<div className='username' style={{ display: "flex", justifyContent: "flex-end", color: "#fbd6d2", fontWeight: "bold", padding: "1rem", borderRadius: "1vh", alignItems: "center" }}>
						<img className="rounded-xl mx-2 w-8 h-8 cursor-pointer" src={Coin} alt="coin" />
						<div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{wallet.balance} REND</div>
					</div>
				</div>
			</div>
			: null
		}

	</div >
};

export default Bar
