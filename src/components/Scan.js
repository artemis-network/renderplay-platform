import { useState } from "react"
import Bar from "./wordle/Bar/Bar"
import axios from 'axios';

const { delay, ServiceBusClient } = require("@azure/service-bus");

const Scan = () => {

	const connectionString = "Endpoint=sb://renderverse.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=c+WTdQ1c79kwLc54nISubSaYQvvs8tLwwojs4Sa10ZQ=";
	const queueName = "imagequeue";

	const sbClient = new ServiceBusClient(connectionString);
	const sessionId = localStorage.getItem("username")

	const [img, setImg] = useState("")
	const [url, setUrl] = useState("")

	function imageV() {
		console.log(url)
		axios.get(url, { headers: {} })
			.then((resp) => setImg('data:image/jpeg;base64, ' + resp.data))
			.catch(err => console.log(err))
	}

	async function set() {
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
							setUrl(string)
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
		imageV();
	}

	return (<div style={{ background: "#321e43", }}>
		<Bar />
		<div style={{ display: "flex", justifyContent: 'center', margin: "2rem", padding: "2rem", flexDirection: "column" }}>
			<div style={{ display: 'flex', justifyContent: 'center', margin: "2rem 0" }}>
				<button onClick={set} className="btn btn-primary" style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", color: "#fff", padding: "2rem", width: "20%" }}> Drop here </button>
			</div>
			<div style={{ display: "flex", justifyContent: "center", height: "500px", width: "500px", margin: "auto", background: "white", borderRadius: "2vh", padding: "1rem" }}>
				{img ? <img style={{ height: "auto", width: "300px", }} src={img} /> : null}
			</div>
		</div>
	</div>)

}



export default Scan