
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Controller from '../../assets/rendle/rendle/joystick.webp'

import PlayPng from '../../assets/rendle/rendle/play.webp'
import StartsPng from '../../assets/rendle/rendle/play_disable.webp'

import { enterContest } from '../../service/rendles.service'

import Dialog from '../common/dialog/Dialog'

import { SwitchVerticalIcon, MenuIcon, XIcon, ClockIcon, PlayIcon, BanIcon } from '@heroicons/react/solid'
import { useCountdown } from '../common/timer/useCountDown'

const ContestCard = (props) => {
	const history = useHistory()

	const [confirmModal, setConfirmModal] = useState(false);
	const [InsufficentModal, setInsufficentModal] = useState(false)
	const [metaMaskModal, setMetaMaskModal] = useState(false)
	const [warningModal, setWarningModal] = useState(false)
	const [contestOpenModal, setContestOpenModal] = useState(false)

	const [days, hours, minutes, seconds, isFinished] = useCountdown(new Date(props.startsOn))

	const InsufficentModalClose = () => setInsufficentModal(false);
	const metaMaskModalClose = () => setMetaMaskModal(false);
	const warningModalClose = () => setWarningModal(false);

	const startsAt = new Date(props.startsOn).getTime()
	const expiresAt = new Date(props.expiresAt).getTime()
	const now = new Date().getTime()
	const startTime = startsAt < now
	const endTime = expiresAt > now

	window.mobileAndTabletCheck = function () {
		let check = false;
		(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	};

	const ConfirmModalOpen = () => {
		const accessToken = localStorage.getItem("accessToken")
		const metaMaskAddress = localStorage.getItem('metaMaskWalletAddress')
		if (!mobileAndTabletCheck) {
			if (
				!metaMaskAddress ||
				metaMaskAddress === null ||
				metaMaskAddress === undefined ||
				metaMaskAddress === "null" ||
				metaMaskAddress === "undefined"
			) return setMetaMaskModal(true)
		}

		if (accessToken !== null) {
			const data = {
				contestId: props._id, request: true,
				walletAddress: metaMaskAddress
			}
			enterContest(data).then((res) => {
				if (res.data.isContestOpened === false) {
					return setContestOpenModal(true)
				}
				if (res.data.isLobbyClosed) {
					setWarningModal(true)
				}
				// if user already in contest [ALREADY_IN_CONTEST]
				if (res.data.status === "[ALREADY_IN_CONTEST]") {
					return history.push("/lobby/" + props._id)
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
			localStorage.setItem("topBarImg", props.rendleImages.topBarImg)
			return
		}
		return history.push("/login")
	}
	const ConfirmModalClose = () => setConfirmModal(false);

	const enterContestAction = () => {

		const metaMaskAddress = localStorage.getItem('metaMaskWalletAddress')
		const data = { contestId: props._id, walletAddress: metaMaskAddress, request: false }

		enterContest(data).then((res) => {
			if (res.data.isContestOpened === false) {
				return setContestOpenModal(true)
			}
			// if user already in contest [ALREADY_IN_CONTEST]
			if (res.data.status === "[ALREADY_IN_CONTEST]") {
				return history.push("/lobby/" + props._id)
			}
			// if user has insufficient [INSUFFICIENT_FUNDS]
			if (res.data.status === "[INSUFFICENT_FUNDS]") {
				return setInsufficentModal(true)
			}
			setConfirmModal(false)
			localStorage.setItem("topBarImg", props.rendleImages.topBarImg)
			return history.push("/lobby/" + props._id)

		})
	}

	const cssFinder = () => "_" + (props.index + 1)
	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}

	const Counter = () => {
		if (props.isExpired)
			return <div className="contest__card__header">
				<BanIcon
					color="#ff0000"
					className="h-6 w-6 m-2 cursor-pointer dark:stroke-white"
				/>
				<div style={{ color: "#ffffff", display: "flex", columnGap: "5.7rem" }}>
					{"Expired"}
				</div>
			</div >


		if (startTime && endTime) {
			return <div className="contest__card__header">
				<PlayIcon
					color="#219f94"
					className="h-6 w-6 m-2 cursor-pointer dark:stroke-white"
				/>
				<div style={{ color: "#ffffff", display: "flex", columnGap: "5.7rem" }}>
					{"Live"}
				</div>
			</div >
		}
		else if (startTime && !endTime)
			return <div>Game Closed</div>

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
		<div style={{ background: `#321E43` }} className={"c-mobile-view "}>
			<Dialog
				buttonColor="green"
				justifyButton="center"
				show={contestOpenModal} close={() => setContestOpenModal(false)} action={() => setContestOpenModal(false)}
				message={`Please, don't alter system time`}
				header="Warning!" buttonText="Close"
			/>
			<Dialog
				buttonColor="green"
				justifyButton="center"
				show={confirmModal} close={ConfirmModalClose} action={enterContestAction}
				message={`Entering in the contest will deduct ${props.entryFee} REND`}
				header="Are you sure?" buttonText="Confirm"
			/>
			<Dialog
				buttonColor="green"
				justifyButton="center"
				show={InsufficentModal} action={InsufficentModalClose} close={InsufficentModalClose}
				message="You have Insufficent funds in your account" header="Sorry!"
				buttonText="Close"
			/>
			<Dialog
				buttonColor="green"
				justifyButton="center"
				show={warningModal} action={warningModalClose} close={warningModalClose}
				message="Game registrations has been closed" header="Sorry!"
				buttonText="Close"
			/>
			<Dialog
				buttonColor="green"
				justifyButton="center"
				show={metaMaskModal} close={metaMaskModalClose} action={metaMaskModalClose}
				message="Connect to your metamask wallet" header="Sorry!"
				buttonText="Close"
			/>

			{/* CONTROLLERS */}
			<input style={{ display: "none" }} type="checkbox" id={"u-mobile__button" + cssFinder()} name={"u-mobile__button" + cssFinder()} />
			<input style={{ display: "none" }} type="checkbox" id={"u-topbar__button" + cssFinder()} name={"u-topbar__button" + cssFinder()} />
			<input style={{ display: "none" }} type="checkbox" id={"u-cards-switcher__button" + cssFinder()} name={"u-cards-switcher__button" + cssFinder()} />
			{/* / controllers */}
			{/* MOBILE VIEW CONTAINER */}
			<img style={{ position: "absolute", margin: "3.2rem 0", padding: ".5rem" }} src={props.rendleImages.bannerImg} alt="img" />
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
									<div className='' style={{ display: "flex", justifyContent: "center", color: "white", fontSize: "1.25rem" }}>
										Play & Win
									</div>
									<div style={{ display: "flex", justifyContent: "center", fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
										100,000 REND
									</div>
								</div>
							</div>
							<div className={"c-card__details__bottom"}>
								<Counter />
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* SWITCHER CARDS BUTTON */}
			<label htmlFor={"u-cards-switcher__button" + cssFinder()} className={"c-button c-switcher__button"}>
				<SwitchVerticalIcon className='h-4 w-4 cursor-pointer' color="white" />
			</label>
			{startTime && !props.isExpired ?
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
				!startTime && !props.isExpired ?
					<img
						alt="play"
						src={StartsPng}
						onClick={() => ("")}
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
		</div >
	);
}

export default ContestCard 