import PlayPng from '../assets/play.webp'

import Bar from "./wordle/Bar/Bar"

import Lottie from 'lottie-react-web'

import FREE from '../assets/free.json'
import PAID from '../assets/paid.json'
import { useHistory } from 'react-router'

const defaultOptions_FREE = {
	loop: true,
	autoplay: true,
	animationData: FREE,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const defaultOptions_PAID = {
	loop: true,
	autoplay: true,
	animationData: PAID,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const Scan = () => {


	const history = useHistory()

	const scanPage = () => history.push("/scan")

	return (<div style={{ background: "#321e43", }}>
		<Bar />
		<div style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "row", paddingTop: "4rem" }}>


			<div style={{ position: "relative" }}>
				<Lottie
					style={{ width: "40rem", }}
					options={defaultOptions_FREE}
				/>
				<img
					alt="play"
					src={PlayPng}
					onClick={scanPage}
					className='h-36 w-36 cursor-pointer'
					style={{
						position: "absolute",
						margin: "auto",
						left: 0,
						right: 0,
						bottom: "1rem"
					}}
					color="green" />
			</div>
			<div style={{ position: "relative" }}>
				<Lottie
					style={{ width: "40rem", }}
					options={defaultOptions_PAID}
				/>
				<img
					alt="play"
					onClick={scanPage}
					src={PlayPng}
					className='h-36 w-36 cursor-pointer'
					style={{
						position: "absolute",
						margin: "auto",
						left: 0,
						right: 0,
						bottom: "1rem"
					}}
					color="green" />
			</div>
		</div>
	</div>)

}



export default Scan