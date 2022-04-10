import Bar from './wordle/Bar/Bar'
import video from '../assets/Video.m4v'
import CS from '../assets/new-product-launching-ceremony.svg'

const ComingSoon = () => {

	return <div style={{ maxHeight: "98vh", background: "#321E43" }}>
		<Bar />
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

export default ComingSoon