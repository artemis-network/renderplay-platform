import Bar from './wordle/Bar/Bar'
import ComingSoonPng from '../assets/cs.webp'

const ComingSoon = () => {



	return <div style={{ minHeight: "100vh", background: "#321E43" }}>
		<Bar />
		<div style={{ color: "white", display: "flex", justifyContent: "center", width: "100%" }}>
			<img width="700" style={{ display: "flex", justifyContent: "center" }} src={ComingSoonPng} alt="coming soon" />
		</div>
	</div>
}

export default ComingSoon