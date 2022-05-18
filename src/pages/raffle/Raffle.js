import { lazy } from 'react';

import video from '../../assets/raffle/raffle.m4v'
import CS from '../../assets/raffle/new-product-launching-ceremony.svg'

const Bar = lazy(() => import("../common/bar/Bar"));

const Raffle = () => {
	return <div style={{ maxHeight: "98vh", background: "#321E43" }}>
		<Bar is_in_raffle={true} />
		<video
			style={{
				height: "auto",
				width: "100%",
				objectFit: "contain",
			}}
			autoPlay
			loop
			muted
			playsInline
		>
			<source src={video} type="video/mp4" />
		</video>
		<div style={{ background: "#321e43", color: "#fff", minHeight: "20vh", display: "flex", justifyContent: 'center', padding: "4rem", alignItems: "center", flexDirection: "column" }}>
			<img
				className='img_ani'
				style={{ height: "40rem", width: "40rem" }}
				src={CS}
			/>
			<h2 style={{ fontSize: "3rem", fontWeight: 'bold' }}>Coming Soon</h2>
		</div>
	</div>
}

export default Raffle 