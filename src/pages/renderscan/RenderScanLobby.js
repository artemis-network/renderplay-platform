import Bar from '../common/bar/Bar'
import Countdown from "react-countdown"
import { ClockIcon } from '@heroicons/react/solid'


export const RenderScanLobby = () => {


	const expiredIn = () => {
		const data = JSON.parse(localStorage.getItem("renderScanData"));
		const now = new Date(Date.now())
		const time = new Date(data.startsOn)
		return time.getTime() - now.getTime();
	}

	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}

	const counter = ({ hours, minutes, seconds, completed }) => {

		return <div className="contest__card__header" style={{ alignItems: "center", margin: "0 4rem" }}>
			<div style={{ color: "#ffffff", display: "flex", columnGap: "1.5rem" }}>
				<div>
					<span style={{ background: "#253393", fontSize: "7rem", margin: "0 .5rem", padding: "1rem", borderRadius: "2vh" }}>
						{timerFormatter(hours)}
					</span>
					<span style={{ background: "#253393", fontSize: "7rem", margin: "0 .5rem", padding: "1rem", borderRadius: "2vh" }}>
						{timerFormatter(minutes)}
					</span>
					<span style={{ background: "#253393", fontSize: "7rem", margin: "0 .5rem", padding: "1rem", borderRadius: "2vh" }}>
						{timerFormatter(seconds)}
					</span>
				</div>
			</div>
		</div >
	}


	return (<div style={{ background: "#321e43" }}>
		<Bar />
		<div style={{ display: "flex", justifyContent: 'center', flexDirection: "column", rowGap: "2rem", alignItems: 'center' }}>
			<div style={{ fontSize: "4rem", color: "white", margin: "4rem 2rem", }}>Renderscan Lobby</div>
			<Countdown renderer={counter} date={Date.now() + expiredIn()} />
		</div>
	</div>)

}