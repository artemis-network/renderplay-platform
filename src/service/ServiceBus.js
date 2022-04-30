// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the receiveMessages() function can be used to receive Service Bus
 * messages in a loop.
 *
 * Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates how to receive Service Bus messages in a loop
 */

const { delay, ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
// Define connection string and related Service Bus entity names here
const connectionString = "Endpoint=sb://renderverse.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=NcuXhckw2lcTPljHX/Vpo8gQxR4LnjAHFrXdAoFbZtw=";
const queueName = "imagequeue";

export async function serviceBusReceive() {
	const sbClient = new ServiceBusClient(connectionString);
	try {
		await receiveMessages(sbClient, "akash");
	} finally {
		await sbClient.close();
	}
}

async function receiveMessages(sbClient, sessionId) {
	// If receiving from a subscription you can use the acceptSession(topic, subscription, sessionId) overload
	let endDate;

	console.log(`receive started`)
	let i = 0;
	while (i < 12) {
		i++;
		console.log(`Creating session receiver for session '${sessionId}'`);
		const receiver = await sbClient.acceptSession(queueName, sessionId);

		const subscribePromise = new Promise((_, reject) => {
			const processMessage = async (message) => {
				console.log(`Received: ${message.sessionId} - ${message.body} `);
				return message;
			};
			const processError = async (args) => {
				console.log(`>>>>> Error from error source ${args.errorSource} occurred: `, args.error);
				reject(args.error);
			};

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
			await Promise.race([subscribePromise, delay(remainingTime)]);
			// wait time has expired, we can stop listening.
			await receiver.close();
			console.log(`Time has expired, closing receiver for session '${sessionId}'`);
		} catch (err) {
			// `err` was already logged part of `processError` above.
			await receiver.close();
			console.log(err);
		}

	}
}