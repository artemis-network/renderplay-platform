import Bar from '../common/bar/Bar'
import { useHistory } from 'react-router'
import { useCountdown } from '../common/timer/useCountDown'
import { useEffect, useState } from 'react'
import { getRenderScanQuizQuestion } from '../../service/renderscan.service'


export const RenderScanLobby = () => {

	const history = useHistory();

	const data = JSON.parse(localStorage.getItem("renderScanData"));
	const [expiresAt, setExpiresAt] = useState(new Date(data.startsOn))


	const [days, hours, minutes, seconds, isFinished] = useCountdown(expiresAt);

	useEffect(() => {
		const d = { contestId: data.contestId };
		getRenderScanQuizQuestion(d).then((resp) => {
			setExpiresAt(resp.data.lobbyTime)
		}).catch(err => console.log(err))
	}, [])

	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}

	const Counter = () => {
		if (isFinished)
			return <button className='btn btn-primary' onClick={() => history.push("/renderscan/game")}>Enter</button>

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
			<Counter />
		</div>
	</div>)

}