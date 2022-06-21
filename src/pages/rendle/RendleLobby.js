
import Bar from '../common/bar/Bar'
import { useHistory } from 'react-router'
import { useCountdown } from '../common/timer/useCountDown'
import { useEffect, useState } from 'react'
import { getContestantStatus } from '../../service/rendles.service'
import { ClockIcon } from "@heroicons/react/outline";
import Alaram from '../../assets/rendle/rendle/alram.webp'
import ProcessPng from '../../assets/rendle/rendle/process.webp'
import { useParams } from 'react-router'

import Dialog from '../common/dialog/Dialog'

const timerFormatter = (time) => {
	time = String(time)
	if (time.length === 1)
		time = "0" + time
	return time
}

export const RendleLobby = () => {

	const history = useHistory();
	const params = useParams();

	const [unAuth, setUnAuth] = useState(false)

	const [expiresAt, setExpiresAt] = useState(new Date().getTime() + (1000 * 60 * 60 * 1))
	const [days, hours, minutes, seconds, isFinished] = useCountdown(expiresAt);

	function init() {
		getContestantStatus({ contestId: params.contestId })
			.then((res) => {

				if (!res.data.isValidGameEntry)
					setUnAuth(true)

				setExpiresAt(res.data.opensAt)
				if (res.data.isOpened || res.data.isGameCompleted) return history.push("/game/" + params.contestId)
			}).catch(err => {
				return history.push("/")
			})
	}

	useEffect(() => {
		init()
		if (isFinished === true) return history.push("/game/" + params.contestId)
	}, [isFinished])


	const Counter = () => {

		const count = (minutes === 0 && seconds < 0) || (hours === 1)

		return <div className="contest__card__header" style={{ alignItems: "center", margin: "0 4rem" }}>
			{!count ?
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
				:
				<div style={{ color: "white", fontSize: "1.25rem", fontWeight: "bold" }}>Please    wait    while    loading...</div>
			}
		</div >
	}


	return (<div style={{ background: "#321e43", minHeight: "100vh" }}>
		<Bar />
		{!unAuth ? <div style={{ display: "flex", justifyContent: "center", margin: "5rem 0" }}>
			<div style={{
				borderRadius: "3.8vh",
				border: "6px solid gray",
				position: "relative",
				minWidth: "30vw"
			}}>
				<img src={Alaram} style={{ position: "absolute", right: "-4rem", bottom: "-4rem", }} width="150" alt="alram" />
				<img src={ProcessPng} style={{ position: "absolute", left: "-8rem", top: "-6rem" }} width="300" alt="alram" />
				<div style={{
					backgroundImage: "linear-gradient(to bottom, #9901ff, #8c03e6, #7f05cd, #7207b4, #65099d)",
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
		</div> : null}

		<Dialog
			show={unAuth} close={() => history.push("/")} action={() => history.push("/")}
			message={`Unauthorized Access!`}
			header="Warning" buttonText="Close"
		/>
	</div >)

}