import Bar from './wordle/Bar/Bar'
import ComingSoonPng from '../assets/coming_soon.svg'
import { useLocation } from 'react-router'

const ComingSoon = () => {

	const location = useLocation()
	let message = ""
	if (location.pathname === "/sc") message = "Scavenger Hunt"
	if (location.pathname === "/lottery") message = "Lottery"

	return <div style={{ minHeight: "100vh", background: "#321E43" }}>
		<Bar />

		<div style={{ fontSize: "2rem", color: "white", fontWeight: "bold", display: "flex", justifyContent: "center" }}> {message} </div>
		<div style={{ color: "white", display: "flex", justifyContent: "center", width: "100%" }}>
			<img width="900" style={{ display: "flex", alignSelf: "center", justifyContent: "center" }} src={ComingSoonPng} alt="coming soon" />
		</div>
	</div>
}

export default ComingSoon