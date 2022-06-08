
import Bar from '../common/bar/Bar'
import { useHistory } from 'react-router'
import { useCountdown } from '../common/timer/useCountDown'
import { useEffect, useState } from 'react'
import { getContestantStatus } from '../../service/rendles.service'
import { ClockIcon } from "@heroicons/react/outline";
import Alaram from '../../assets/rendle/rendle/alram.webp'
import ProcessPng from '../../assets/rendle/rendle/process.png'

export const RendleLobby = () => {

	const history = useHistory();

	const data = JSON.parse(localStorage.getItem("gameConfig"));
	const userId = localStorage.getItem("userId")

	const [expiresAt, setExpiresAt] = useState(new Date(new Date().getTime() + (1000 * 60 * 1)))

	function init() {
		getContestantStatus({ userId: userId, contestId: data._id })
			.then((res) => {
				if (res.data.isGameCompleted) return history.push("/game")
				setExpiresAt(new Date(res.data.opensAt))
			}).catch(err => console.log(err))
	}

	useEffect(() => {
		init()
	}, [])

	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}

	const [days, hours, minutes, seconds, isFinished] = useCountdown(expiresAt);

	const Counter = () => {
		if (isFinished)
			return <button className='btn btn-primary' onClick={() => history.push("/game")}>Enter</button>

		return <div className="contest__card__header" style={{ alignItems: "center", margin: "0 4rem" }}>
			<div style={{ color: "#ffffff", display: "flex", columnGap: "1.5rem" }}>
				<div style={{ fontSize: "1.25rem" }}>
					Game starts in
					<span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 1rem" }}>
						{timerFormatter(minutes)}
					</span>
					<span>minutes</span>
					<span style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 1rem" }}>
						{timerFormatter(seconds)}
					</span>
					<span>seconds</span>
				</div>
			</div>
		</div >
	}


	return (<div style={{ background: "#321e43" }}>
		<Bar />
		<div style={{ display: "flex", justifyContent: "center", margin: "5rem 0" }}>

			<div style={{
				borderRadius: "3.8vh",
				border: "6px solid gray",
				position: "relative"
			}}>
				<img src={Alaram} style={{ position: "absolute", right: "-4rem", bottom: "-4rem", }} width="150" alt="alram" />
				<img src={ProcessPng} style={{ position: "absolute", left: "-8rem", top: "-6rem" }} width="300" alt="alram" />
				<div style={{
					backgroundImage: "linear-gradient(to bottom, #9901ff, #8c03e6, #7f05cd, #7207b4, #65099d)", width: "30vw", height: "50vh",
					borderRadius: "3vh",
					border: "6px solid #C670FF",
					padding: "3rem 0"
				}}>
					<div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", rowGap: "2rem" }}>
						<div style={{ fontSize: "2rem", color: "white" }}>Rendle Lobby</div>
						<div style={{ borderBottom: "4px solid white", width: "10vw", borderRadius: "2vh", opacity: "0.8" }}></div>
						<ClockIcon className='h-24 w-24' color="white" />
						<Counter />
					</div>
				</div>
			</div>


		</div>

	</div >)

}