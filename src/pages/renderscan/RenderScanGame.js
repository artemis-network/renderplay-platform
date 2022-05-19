import { useEffect, useState } from "react"

import DropSvg from '../../assets/renderscan/black frame.svg'
import HowToPlaySvg from '../../assets/renderscan/hp.svg'
import Astro from '../../assets/renderscan/Artboard 4.svg'

import BottomBar from '../../assets/renderscan/footer.svg'

import GrabPng from '../../assets/renderscan/grab.svg'
import ProcessPng from '../../assets/renderscan/processing.svg'
import SubmitPng from '../../assets/renderscan/submit.svg'

import RenderScanImg from '../../assets/renderscan/renderscan.svg'


import SpaceShipSvg from '../../assets/renderscan/Artboard 5.svg'
import CameraSvg from '../../assets/renderscan/Artboard 6.svg'

import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";

const { delay, ServiceBusClient } = require("@azure/service-bus");

import { getRenderScanPlayerStatus, saveRenderScanGame } from '../../service/renderscan.service'

import { GameModal } from "./components/modals/GameModal";

import './RenderScanGame.css'

const Scan = () => {

	const connectionString = `
	Endpoint=sb://renderverse.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=c+WTdQ1c79kwLc54nISubSaYQvvs8tLwwojs4Sa10ZQ=
	`

	const queueName = "imagequeue";

	const history = useHistory()

	const sbClient = new ServiceBusClient(connectionString);
	const sessionId = localStorage.getItem("username")

	const [img, setImg] = useState("")
	const [isWating, setIsWaiting] = useState(false)

	const [isSubmitted, setIsSubmitted] = useState(false)

	const getPlayerStatus = () => {
		const contest = JSON.parse(localStorage.getItem("renderScanData"))
		const data = {
			contestId: contest.contestId,
			userId: localStorage.getItem("userId")
		}
		getRenderScanPlayerStatus(data)
			.then((res) => {
				setIsSubmitted(res.data.isSubmitted)
				console.log(res.data)
			})
			.catch((err) => { console.log(err) })
	}

	const closeModal = () => {
		if (isSubmitted) return history.push("/renderscan")
	}

	const save = () => {
		const contest = JSON.parse(localStorage.getItem("renderScanData"))
		const data = {
			contestId: contest.contestId,
			userId: localStorage.getItem("userId"),
			fileUrl: img
		}
		saveRenderScanGame(data)
			.then((res) => {
				console.log(res)
				return history.push("/renderscan")
			})
			.catch((err) => { console.log(err) })
	}

	useEffect(() => {
		getPlayerStatus()
	}, [])

	async function set() {
		setIsWaiting(true)
		let endDate;
		let isMessageReceived = false;
		console.log(`receive started`)
		let i = 0;
		while (i < 12) {
			i++;
			console.log(`Creating session receiver for session '${sessionId}'`);
			const receiver = await sbClient.acceptSession(queueName, sessionId);
			const subscribePromise = new Promise(function (resolve, reject) {
				const processMessage = async (message) => resolve(message);
				const processError = async (args) => reject(args);
				receiver.subscribe({
					processMessage,
					processError,
				});
			});
			const now = Date.now();
			endDate = now + 5000;
			let remainingTime = endDate - now;
			console.log(`Waiting for ${remainingTime} milliseconds for messages to arrive.`);
			try {
				await Promise.race([subscribePromise, delay(remainingTime)])
					.then(async (res) => {
						if (res.body != undefined || res.body != null) {
							var string = new TextDecoder().decode(res.body);
							setIsWaiting(false)
							setImg(string)
							isMessageReceived = true;
						}
					}).catch(err => {
						console.log(err)
					})
				await receiver.close();
				// wait time has expired, we can stop listening.
				console.log(`Time has expired, closing receiver for session '${sessionId}'`);
			} catch (err) {
				// `err` was already logged part of `processError` above.
				await receiver.close();
				console.log(err);
			}
			console.log("Message recieved >> " + isMessageReceived)
			if (isMessageReceived) {
				await receiver.close();
				break;
			}
		}
		setIsWaiting(false)
	}

	return (<div className="renderscan_bg" >
		<GameModal isOpen={isSubmitted} handleClose={closeModal} />
		<div style={{
			display: "flex",
			padding: "0 1rem",
			alignItems: "center",
			background: "#6D1DAF",
			justifyContent: "center",
			width: "100vw",
			height: "8vh"
		}}>
			<ArrowLeftIcon
				className='h-12 w-12 cursor-pointer'
				color="white"
				onClick={() => history.push("/renderscan")}
				style={{ zIndex: 3, position: "absolute", left: "1.5rem" }}
			/>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<img src={RenderScanImg} alt="" className="render_title" style={{ zIndex: "2" }} />
			</div>
		</div>
		<div className="render_word">Scan this word</div>
		<div className="renderscan_main_grid">
			<div style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', rowGap: "2rem" }}>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
					<div style={{ position: 'relative', }}>
						<img src={DropSvg} className="renderscan_img_holder" />
						<div style={{ position: 'absolute', left: "1rem", top: "-1rem" }}>
							<img src={SpaceShipSvg} className="renderscan_img_deco render_flight_animation" />
						</div>
						<div style={{ position: 'absolute', right: "0", bottom: "0rem" }}>
							<img src={CameraSvg} className="renderscan_img_deco render_camera_animation" />
						</div>
						{img ? <div style={{ position: "absolute", right: "50%", left: "20%", width: "62%", margin: "auto", bottom: "2.5rem" }} >
							<img style={{
								height: "auto",
								width: "auto",
								transform: "rotate(-270deg)"
							}} src={img} />
						</div> : null}
					</div>

					<div style={{ display: "flex", justifyContent: "center" }}>
						{
							isWating ? <div>
								<img
									alt="play"
									onClick={set}
									src={ProcessPng}
									className='render_grab'
								/>
							</div> :
								<div>
									{img !== "" ? <img
										alt="play"
										onClick={save}
										src={SubmitPng}
										className='render_grab'
									/> :
										<img
											alt="play"
											onClick={set}
											src={GrabPng}
											className='render_grab'
										/>
									}
								</div>

						}
					</div>


				</div>
			</div>
			<div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
				<img src={HowToPlaySvg} className="renderscan_how_to_play" />
			</div>
		</div>

		<div className="renderscan_astro">
			<img src={Astro} className="astro_img" />
		</div>

		<img src={BottomBar} className="renderscan_bottom_bar" />

	</div >)


}




export default Scan