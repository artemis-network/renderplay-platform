import React from 'react'
import Countdown from "react-countdown"
import { SwitchVerticalIcon, MenuIcon, XIcon, ClockIcon } from '@heroicons/react/outline'

// import { useHistory } from 'react-router-dom'
import { PlayIcon, BanIcon } from '@heroicons/react/outline'
import Controller from '../../../assets/controller.png'

import './ContestCard.css'

const ContestCard = (props) => {

	// const history = useHistory()

	const { timer_1, timer_2 } = { timer_1: props.game_session[0].starts_on, timer_2: props.game_session[1].starts_on }
	console.log(timer_1)
	const cssFinder = () => "_" + (props.index + 1)
	const expiredIn = (date) => {
		const now = new Date(Date.now() + (1000 * 60 * 60 * 5) + (1000 * 60 * 30))
		const time = new Date(date)
		const exp = time.getTime() - now.getTime()
		return exp
	}
	// const gameConfig = (i) => {
	// 	const username = localStorage.getItem("username")
	// 	if (username !== null) {
	// 		localStorage.setItem("gameConfig", JSON.stringify(i))
	// 		history.push("/wordle/game")
	// 	}
	// 	else
	// 		history.push("/login")
	// }
	const Expired = () => <div className="contest__card__header">
		<BanIcon
			color="#ffffff"
			className="h-6 w-6 m-2 cursor-pointer dark:stroke-white"
		/>
		<div style={{ color: "white" }}>
			Expired
		</div>
	</div>
	const exp_renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed)
			return <div className="contest__card__header">
				<PlayIcon
					color="#219f94"
					className="h-6 w-6 m-2 cursor-pointer dark:stroke-white"
				/>
				<div style={{ color: "#ffffff" }}>
					Live
				</div>
			</div>
		else
			return <div className="contest__card__header">
				<ClockIcon
					color="#F10086"
					className="h-6 w-6 m-2 cursor-pointer dark:stroke-red"
				/>
				<div style={{ color: "#ffffff", display: "flex", columnGap: "4rem" }}>
					{"Starts in"} <div style={{ fontSize: ".8rem" }}>
						<div>
							<span style={{ background: "#581291", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
								{hours}
							</span>
							<span style={{ background: "#581291", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
								{minutes}
							</span>
							<span style={{ background: "#581291", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
								{seconds}
							</span>
						</div>

					</div>
				</div>
			</div>
	}
	return (
		<div style={{ background: `#321E43` }} className={"c-mobile-view"}>
			{/* CONTROLLERS */}
			<input style={{ display: "none" }} type="checkbox" id={"u-mobile__button" + cssFinder()} name={"u-mobile__button" + cssFinder()} />
			<input style={{ display: "none" }} type="checkbox" id={"u-topbar__button" + cssFinder()} name={"u-topbar__button" + cssFinder()} />
			<input style={{ display: "none" }} type="checkbox" id={"u-cards-switcher__button" + cssFinder()} name={"u-cards-switcher__button" + cssFinder()} />
			{/* / controllers */}
			{/* MOBILE VIEW CONTAINER */}
			<img style={{ position: "absolute", margin: "3.2rem 0", padding: ".5rem" }} src={props.img} alt="img" />
			<img style={{ position: "absolute", margin: "4.5rem 0", padding: ".5rem", top: "15rem", zIndex: 4, width: "60rem" }} src={props.line} alt="img" />
			<img style={{
				position: "absolute",
				margin: "4.5rem 0",
				padding: ".5rem", top: "16rem", left: "-0.25rem", zIndex: 4, width: "5rem",
				transform: "rotate(-15deg)"
			}} src={Controller} alt="img" />

			<div className={"c-mobile-view__inner"}>
				<div className={"c-mobile__topbar"}>
					<label htmlFor={"u-topbar__button" + cssFinder()} className={"c-button c-topbar__button--menu"}>
						<MenuIcon style={{ transform: "translateY(-1rem)" }} className='h-6 2-6' color='white' />
					</label>
					<label htmlFor={"u-topbar__button" + cssFinder()} className={"c-button c-topbar__button--close"}>
						<XIcon style={{ transform: "translateY(-1rem)" }} className='h-6 2-6' color='white' />
					</label>
					<ul>
						<li><div className={"u-link__effect"}>Events list</div></li>
						<li><div className={"u-link__effect"}>Favorites</div></li>
						<li><div className={"u-link__effect"}>Credits</div></li>
					</ul>
				</div>
				{/* CARDS */}
				<div className={"c-cards__inner"} >
					<div className={"c-card c-card--back"} style={{ transform: "translateY(-1rem)" }}>
						<div className={"c-card__details"}>
							<div className={"c-card__details__top"}>

								{/* <h1>RENDLE #{props.game_session[1].contest_id}</h1> */}


								<div style={{ display: "flex", flexDirection: "column", transform: "translateY(-1rem)", padding: "2rem 2rem" }}>
									<div style={{ display: "flex", justifyContent: "center", color: "white", fontSize: "1.25rem" }}>
										Play & Win
									</div>
									<div style={{ display: "flex", justifyContent: "center", fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
										100,000 REND
									</div>
								</div>


							</div>
							<div className={"c-card__details__bottom"}>
								{
									expiredIn(timer_2) < -1000 * 60 * 30 ?
										<Expired /> : <Countdown renderer={exp_renderer} date={Date.now() + expiredIn(timer_2)} />
								}
							</div>
						</div>
					</div>
					<div className={"c-card c-card--front"} style={{ transform: "translateY(-1rem)" }}>
						<div className={"c-card__details"}>
							<div className={"c-card__details__top"}>
								{/* {
									expiredIn(timer_1) > -1000 * 60 * 30 && expiredIn(timer_1) < 0 ?
										<PlayIcon
											onClick={() => gameConfig({
												session: props.game_session[0],
												game_type: props.game_type,
												id: props.id
											})}
											className='h-14 w-14 cursor-pointer'
											style={{ position: "absolute", right: "15%" }}
											color="white" />
										:
										<ClipboardCheckIcon
											className='h-14 w-14 cursor-pointer'
											style={{ position: "absolute", right: "15%" }}
											color="white" />
								} */}
								{/* <h1>RENDLE #{props.game_session[0].contest_id}</h1> */}
								<div style={{ display: "flex", flexDirection: "column", transform: "translateY(-1rem)", padding: "2rem 2rem" }}>
									<div style={{ display: "flex", justifyContent: "center", color: "white", fontSize: "1.25rem" }}>
										0/10
									</div>
									<div style={{ display: "flex", justifyContent: "center", fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
										Winners
									</div>
								</div>
							</div>
							<div className={"c-card__details__bottom"}>
								{/* {
									expiredIn(timer_1) < -1000 * 60 * 30 ?
										<Expired /> : <Countdown renderer={exp_renderer} date={Date.now() + expiredIn(timer_1)} />
								} */}
								<div style={{ color: "white" }}>Entry Fee 0.003 BNB</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* SWITCHER CARDS BUTTON */}
			<label htmlFor={"u-cards-switcher__button" + cssFinder()} className={"c-button c-switcher__button"}>
				<SwitchVerticalIcon className='h-4 w-4 cursor-pointer' color="white" />
			</label>

			{/* {
				expiredIn(timer_2) > -1000 * 60 * 30 && expiredIn(timer_2) ?
					<PlayIcon
						onClick={() => gameConfig({
							session: props.game_session[0],
							game_type: props.game_type,
							id: props.id
						})}
						className='h-14 w-14 cursor-pointer'
						style={{
							position: "absolute",
							margin: "auto",
							left: 0,
							right: 0,
							bottom: "-1rem"

						}}
						color="white" />
					:
					<ClipboardCheckIcon
						className='h-14 w-14 cursor-pointer'
						style={{ position: "absolute", right: "15%" }}
						color="white" />
			} */}

		</div >
	);
}

export default ContestCard 