import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
	const countDownDate = new Date(targetDate).getTime();

	const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(
			() => setCountDown(countDownDate - new Date().getTime()), 1000);
		return () => clearInterval(interval);
	}, [countDownDate]);

	return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
	const oneDay = (1000 * 60 * 60 * 24)
	const oneHour = (1000 * 60 * 60)
	const oneMinute = (1000 * 60)
	const oneSecond = (1000)

	// calculate time left
	const days = Math.floor(countDown / oneDay);
	const hours = Math.floor((countDown % oneDay) / oneHour);
	const minutes = Math.floor((countDown % oneHour) / oneMinute);
	const seconds = Math.floor((countDown % oneMinute) / oneSecond);

	const isFinished = (days + hours + minutes + seconds) <= 0

	return [days, hours, minutes, seconds, isFinished];
};

export { useCountdown };