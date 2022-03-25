import React from 'react'
import Countdown from "react-countdown"
import { SwitchVerticalIcon, MenuIcon, XIcon, ClockIcon, PlayIcon, BanIcon } from '@heroicons/react/solid'

import { useHistory } from 'react-router-dom'
import Controller from '../../../assets/joystick.webp'

import PlayPng from '../../../assets/play.webp'
import ExpiredPng from '../../../assets/menu.webp'
import StartsPng from '../../../assets/play_disable.webp'

import './ContestCard.css'

const ContestCard = (props) => {

	const history = useHistory()

	const cssFinder = () => "_" + (props.index + 1)
	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}
	const expiredIn = () => {
		const now = new Date(Date.now() + (1000 * 60 * 60 * 5) + (1000 * 60 * 30))
		const time = new Date(props.starts_on)
		return time.getTime() - now.getTime()
	}

	const gameConfig = () => {
		const username = localStorage.getItem("username")
		if (username !== null) {
			localStorage.setItem("gameConfig", JSON.stringify(props))
			return history.push("/rendle/game")
		}
		else return history.push("/login")
	}

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
				<div style={{ color: "#ffffff", display: "flex", columnGap: "5.7rem" }}>
					{"Starts in"} <div style={{ fontSize: ".8rem" }}>
						<div>
							<span style={{ background: "#253393", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
								{timerFormatter(hours)}
							</span>
							<span style={{ background: "#253393", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
								{timerFormatter(minutes)}
							</span>
							<span style={{ background: "#253393", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
								{timerFormatter(seconds)}
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
						<li><div className={"u-link__effect"}>Leaderboard</div></li>
						<li><div className={"u-link__effect"}>Stats</div></li>
						<li><div className={"u-link__effect"}>Rewards</div></li>
					</ul>
				</div>
				{/* CARDS */}
				<div className={"c-cards__inner"} >
					<div className={"c-card c-card--back"} style={{ transform: "translateY(-1rem)" }}>
						<div className={"c-card__details"}>
							<div className={"c-card__details__top"}>
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
								<div style={{ color: "white" }}>Entry Fee 0.003 BNB</div>
							</div>
						</div>
					</div>
					<div className={"c-card c-card--front"} style={{ transform: "translateY(-1rem)" }}>
						<div className={"c-card__details"}>
							<div className={"c-card__details__top"}>
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
									expiredIn() < -1000 * 60 * 60 * 4 ?
										<Expired /> : <Countdown renderer={exp_renderer} date={Date.now() + expiredIn()} />
								}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* SWITCHER CARDS BUTTON */}
			<label htmlFor={"u-cards-switcher__button" + cssFinder()} className={"c-button c-switcher__button"}>
				<SwitchVerticalIcon className='h-4 w-4 cursor-pointer' color="white" />
			</label>
			{
				expiredIn() > -1000 * 60 * 60 * 4 && expiredIn() < 0 ?
					<img
						alt="play"
						src={PlayPng}
						onClick={() => gameConfig()}
						className='h-24 w-24 cursor-pointer'
						style={{
							position: "absolute",
							margin: "auto",
							left: 0,
							right: 0,
							bottom: "-2.5rem"

						}}
						color="green" />
					: null

			}
			{
				expiredIn() < 1000 * 60 * 60 * 4 && expiredIn() > 0 ?
					<img
						alt="play"
						src={StartsPng}
						className='h-24 w-24 cursor-pointer'
						style={{
							position: "absolute",
							margin: "auto",
							left: 0,
							right: 0,
							bottom: "-2.5rem"

						}}
						color="green" />
					: null

			}

			{
				expiredIn() < -1000 * 60 * 60 * 8 ?
					<img
						alt="play"
						src={ExpiredPng}
						className='h-20 w-20 cursor-pointer'
						style={{
							position: "absolute",
							margin: "auto",
							left: 0,
							right: 0,
							bottom: "-2.5rem"

						}}
					/>
					: null
			}
		</div >
	);
}

export default ContestCard 