import { useEffect, useState } from "react";

import DropSvg from "../../assets/renderscan/black frame.svg";
import HowToPlaySvg from "../../assets/renderscan/hp.svg";
import Astro from "../../assets/renderscan/Artboard 4.svg";

import BottomBar from "../../assets/renderscan/footer.svg";

import GrabPng from "../../assets/renderscan/grab.svg";
import ProcessPng from "../../assets/renderscan/processing.svg";
import SubmitPng from "../../assets/renderscan/submit.svg";

import RenderScanImg from "../../assets/renderscan/renderscan.svg";

import SpaceShipSvg from "../../assets/renderscan/Artboard 5.svg";
import CameraSvg from "../../assets/renderscan/Artboard 6.svg";

import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router";

const { delay, ServiceBusClient } = require("@azure/service-bus");

import {
	getRenderScanPlayerStatus,
	saveRenderScanGame,
	getRenderScanQuizQuestion,
} from "../../service/renderscan.service";

import { GameModal } from "./components/modals/GameModal";
import { SaveModal } from "./components/modals/SaveModal";
import { ConfirmSaveModal } from "./components/modals/ConfirmSaveModal";

import { useCountdown } from "../common/timer/useCountDown";

import "./RenderScanGame.css";

const Scan = () => {
	const history = useHistory();

	const connectionString = `
	Endpoint=sb://renderverse.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=c+WTdQ1c79kwLc54nISubSaYQvvs8tLwwojs4Sa10ZQ=
	`;
	const queueName = "imagequeue";
	const sbClient = new ServiceBusClient(connectionString);
	const sessionId = localStorage.getItem("username");


	const [expiresAt, setExpiresAt] = useState(new Date());
	const [days, hours, minutes, seconds, isFinished] = useCountdown(expiresAt);

	const [question, setQuestion] = useState("");
	const [isWating, setIsWaiting] = useState(false);
	const [img, setImg] = useState("");
	const [confirm, setConfirm] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [match, setMatch] = useState(false);

	const closeModal = () => history.push("/renderscan");
	const openConfirm = () => setConfirm(true);

	const userId = localStorage.getItem("userId")

	const getPlayerStatus = () => {
		const contest = JSON.parse(localStorage.getItem("renderscanGameData"));
		const data = { contestId: contest._id, userId: userId };
		getRenderScanPlayerStatus(data)
			.then((res) => setIsSubmitted(res.data.isSubmitted))
			.catch((err) => console.log(err));
	};

	const save = () => {
		setConfirm(false);
		const contest = JSON.parse(localStorage.getItem("renderscanGameData"));
		const data = { contestId: contest._id, userId: localStorage.getItem("userId"), fileUrl: img };
		saveRenderScanGame(data).then((res) => setMatch(true)).catch((err) => console.log(err));
	};

	const update = () => {
		const contest = JSON.parse(localStorage.getItem("renderscanGameData"));
		const data = { contestId: contest._id, userId: userId };
		getRenderScanQuizQuestion(data).then((resp) => {
			console.log(resp.data)
			if (!resp.data.isGameStarted) return history.push("/renderscan/lobby")
			setExpiresAt(new Date(new Date(resp.data.expiresAt).getTime() + 1000 * 3))
			setQuestion(resp.data.question)
		});
		getPlayerStatus();
	}

	useEffect(() => {
		update()
	}, [isFinished]);

	const timerFormatter = (time) => {
		time = String(time)
		if (time.length === 1)
			time = "0" + time
		return time
	}

	useEffect(() => {
		setMatch(true)
	}, [img])

	const Counter = () => {
		if (isFinished) return <div className="render_word">Loading next question</div>
		return <div>
			<div className="render_word">{question}</div>
			<div style={{ color: "#ffffff", display: "flex", columnGap: "5.7rem" }}>
				{"Starts in"} <div style={{ fontSize: ".8rem" }}>
					<div>
						<span style={{ background: "#253393", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
							{timerFormatter(hours)}
						</span>
						<span style={{ background: "#253393", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
							{timerFormatter(minutes)}
						</span>
						<span style={{ background: "#253393", fontSize: "1rem", margin: "0 .15rem", padding: ".25rem", borderRadius: ".2vh" }}>
							{timerFormatter(seconds)}
						</span>
					</div>

				</div>
			</div>
		</div>
	}


	async function set() {
		setIsWaiting(true);
		let endDate;
		let isMessageReceived = false;
		console.log(`receive started`);
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
			const now = new Date();
			endDate = now + 5000;
			let remainingTime = endDate - now;
			console.log(
				`Waiting for ${remainingTime} milliseconds for messages to arrive.`
			);
			try {
				await Promise.race([subscribePromise, delay(remainingTime)])
					.then(async (res) => {
						console.log(res)
						console.log(res.body)
						if (res.body != undefined || res.body != null) {
							var string = new TextDecoder().decode(res.body);
							setIsWaiting(false);
							setImg(string);
							isMessageReceived = true;
						}
					})
					.catch((err) => {
						console.log(err);
					});
				await receiver.close();
				// wait time has expired, we can stop listening.
				console.log(
					`Time has expired, closing receiver for session '${sessionId}'`
				);
			} catch (err) {
				// `err` was already logged part of `processError` above.
				await receiver.close();
				console.log(err);
			}
			console.log("Message recieved >> " + isMessageReceived);
			console.log();
			if (isMessageReceived) {
				await receiver.close();
				break;
			}
		}
		setIsWaiting(false);
	}

	return (
		<div className="renderscan_bg">

			<GameModal isOpen={isSubmitted} handleClose={closeModal} />
			<SaveModal isOpen={match} handleClose={() => setMatch(!match)} />
			<ConfirmSaveModal
				show={confirm}
				play={save}
				modalClose={() => setConfirm(!confirm)}
			/>
			<div
				style={{
					display: "flex",
					padding: "0 1rem",
					alignItems: "center",
					background: "#6D1DAF",
					justifyContent: "center",
					width: "100vw",
					height: "8vh",
				}}
			>
				<ArrowLeftIcon
					className="h-12 w-12 cursor-pointer"
					color="white"
					onClick={() => history.push("/renderscan")}
					style={{ zIndex: 3, position: "absolute", left: "1.5rem" }}
				/>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<img
						src={RenderScanImg}
						alt=""
						className="render_title"
						style={{ zIndex: "2" }}
					/>
				</div>
			</div>

			<Counter />
			<div className="renderscan_main_grid">
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						rowGap: "2rem",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<div style={{ position: "relative" }}>
							<img src={DropSvg} className="renderscan_img_holder" />
							<div style={{ position: "absolute", left: "1rem", top: "-1rem" }}>
								<img
									src={SpaceShipSvg}
									className="renderscan_img_deco render_flight_animation"
								/>
							</div>
							<div style={{ position: "absolute", right: "0", bottom: "0rem" }}>
								<img
									src={CameraSvg}
									className="renderscan_img_deco render_camera_animation"
								/>
							</div>
							{img ? (
								<div
									style={{
										position: "absolute",
										right: "50%",
										left: "20%",
										width: "62%",
										margin: "auto",
										bottom: "2.5rem",
									}}
								>
									<img
										style={{
											height: "auto",
											width: "auto",
											transform: "rotate(-270deg)",
										}}
										src={img}
									/>
								</div>
							) : null}
						</div>

						<div style={{ display: "flex", justifyContent: "center" }}>
							{isWating ? (
								<div>
									<img
										alt="play"
										onClick={set}
										src={ProcessPng}
										className="render_grab"
									/>
								</div>
							) : (
								<div>
									{img !== "" ? (
										<img
											alt="play"
											onClick={openConfirm}
											src={SubmitPng}
											className="render_grab"
										/>
									) : (
										<img
											alt="play"
											onClick={set}
											src={GrabPng}
											className="render_grab"
										/>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-start",
						alignItems: "flex-start",
					}}
				>
					<img src={HowToPlaySvg} className="renderscan_how_to_play" />
				</div>
			</div>
			<div className="renderscan_astro">
				<img src={Astro} className="astro_img" />
			</div>

			<img src={BottomBar} className="renderscan_bottom_bar" />
		</div>
	);
};

export default Scan;
