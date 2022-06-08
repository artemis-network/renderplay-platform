
import React, { useState } from 'react'
import Countdown from "react-countdown"

import { useHistory } from 'react-router-dom'

import Controller from '../../../../assets/rendle/rendle/joystick.webp'
import PlayPng from '../../../../assets/rendle/rendle/play.webp'
import ExpiredPng from '../../../../assets/rendle/rendle/menu.webp'
import StartsPng from '../../../../assets/rendle/rendle/play_disable.webp'

import { enterContest } from '../../../../service/rendles.service'

import ConfirmModal from '../confirm_modal/ConfirmModal'
import InsufficentFunds from '../in_sufficent_fund_modals/InsufficentFunds'
import MetaMaskWalletAddressModal from '../metamask_modal/MetaMaskModal'

import { SwitchVerticalIcon, MenuIcon, XIcon, ClockIcon, PlayIcon, BanIcon } from '@heroicons/react/solid'
import { useCountdown } from '../../../common/timer/useCountDown'


import './ContestCard.css'

const ContestCard = (props) => {

	const history = useHistory()


	const [confirmModal, setConfirmModal] = useState(false);
	const [InsufficentModal, setInsufficentModal] = useState(false)
	const [metaMaskModal, setMetaMaskModal] = useState(false)

	const [days, hours, minutes, seconds, isFinished] = useCountdown(new Date(props.expiresAt))

	const InsufficentModalClose = () => setInsufficentModal(false);
	const InsufficentModalOpen = () => setInsufficentModal(true)

	const metaMaskModalClose = () => setMetaMaskModal(false);
	const metaMaskModalOpen = () => setMetaMaskModal(true)

	const ConfirmModalOpen = () => {
		const userId = localStorage.getItem("userId")
		const metaMaskAddress = localStorage.getItem('metaMaskWalletAddress')
		if (
			!metaMaskAddress ||
			metaMaskAddress === null ||
			metaMaskAddress === undefined ||
			metaMaskAddress === "null" ||
			metaMaskAddress === "undefined"
		) return setMetaMaskModal(true)


		if (userId !== null) {
			const data = {
				contestId: props._id, userId: userId, request: true,
				walletAddress: metaMaskAddress
			}
			enterContest(data).then((res) => {
				// if user already in contest [ALREADY_IN_CONTEST]
				if (res.data.status === "[ALREADY_IN_CONTEST]") {
					localStorage.setItem("gameStateId", res.data.gameStateId)
					localStorage.setItem("gameConfig", JSON.stringify(props))
					return history.push("/lobby")
				}
				// if user has insufficient  [INSUFFICIENT_FUNDS]
				if (res.data.status === "[INSUFFICENT_FUNDS]") {
					return setInsufficentModal(true)
				}
				// if user cleared all criteriea [APPROVED]
				if (res.data.status === "[APPROVED]") {
					setConfirmModal(true)
				}
			})
			return
		}
		return history.push("/login")
	}
	const ConfirmModalClose = () => setConfirmModal(false);

	const enterContestAction = () => {
		const userId = localStorage.getItem("userId")

		const metaMaskAddress = localStorage.getItem('metaMaskWalletAddress')
		const data = {
			contestId: props._id,
			walletAddress: metaMaskAddress,
			userId: userId,
			request: false
		}
		enterContest(data).then((res) => {
			// if user already in contest [ALREADY_IN_CONTEST]
			if (res.data.status === "[ALREADY_IN_CONTEST]") {
				localStorage.setItem("gameStateId", res.data.gameStateId)
				localStorage.setItem("gameConfig", JSON.stringify(props))
				return history.push("/lobby")
			}
			// if user has insufficient [INSUFFICIENT_FUNDS]
			if (res.data.status === "[INSUFFICENT_FUNDS]") {
				return setInsufficentModal(true)
			}
			localStorage.setItem("gameConfig", JSON.stringify(props))
			setConfirmModal(false)
			return history.push("/lobby")
		})
	}

	const cssFinder = () => "_" + (props.index + 1)
	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}
	const expiredIn = () => {
		const now = new Date()
		const time = new Date(props.startsOn)
		return time.getTime() - now.getTime()
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
				<div style={{ color: "#ffffff", display: "flex", columnGap: "5.7rem" }}>
					{"Live"}
				</div>
			</div >
		else
			return <div className="contest__card__header">
				<ClockIcon
					color="#FF8D29"
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
			<ConfirmModal show={confirmModal} entryFee={props.entryFee} modalOpen={ConfirmModalOpen} modalClose={ConfirmModalClose} play={enterContestAction} />
			<InsufficentFunds show={InsufficentModal} modalOpen={InsufficentModalOpen} modalClose={InsufficentModalClose} />
			<MetaMaskWalletAddressModal show={metaMaskModal} modalOpen={metaMaskModalOpen} modalClose={metaMaskModalClose} />
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
								<div style={{ color: "white" }}>Entry Fee - {props.entryFee} REND</div>
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
								{!isFinished ? <div>{
									expiredIn() < -1000 * 60 * 60 * 4 ?
										<Expired /> : <Countdown renderer={exp_renderer} date={Date.now() + expiredIn()} />
								}</div>
									: <div>Game Closed</div>
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
				!isFinished ?
					<div>
						{
							expiredIn() > -1000 * 60 * 60 * 4 && expiredIn() < 0 ?
								<img
									alt="play"
									src={PlayPng}
									onClick={() => ConfirmModalOpen()}
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
					</div>
					: null
			}
		</div >
	);
}

export default ContestCard 