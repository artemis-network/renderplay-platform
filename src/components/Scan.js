import { useEffect, useState } from "react"
import io from "socket.io-client";
import Bar from "./wordle/Bar/Bar"

const Scan = () => {

	const [img, setImg] = useState(null)

	useEffect(() => {
		const socket = io.connect(`http://192.168.1.14:5001`);
		socket.on("message", i => {
			setImg(i)
		})
	}, [])


	return (<div style={{ background: "#321e43", }}>
		<Bar />
		<div style={{ display: "flex", justifyContent: 'center', margin: "2rem", padding: "2rem", flexDirection: "column" }}>
			<div style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#fff", padding: "2rem" }}> Drop here </div>
			<div style={{ display: "flex", justifyContent: "center", height: "500px", width: "500px", margin: "auto", background: "white", borderRadius: "2vh", padding: "1rem" }}>
				{img ? <img style={{ height: "auto", width: "300px", }} src={'data:image/png;base64,' + img} /> : null}
			</div>
		</div>
	</div>)
}

export default Scan