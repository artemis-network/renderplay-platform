import axios from 'axios'
import { rendlePrefix, headers } from '../config';

import Line1Img from '../assets/rendle/rendle/line1.webp'
import Line2Img from '../assets/rendle/rendle/line2.webp'

export const enterContest = async (data) => await axios.post(`${rendlePrefix}/enter`, data, headers())
export const saveRendleGame = async (data) => await axios.post(`${rendlePrefix}/save`, data, headers())
export const getContestantStatus = async (data) => await axios.post(`${rendlePrefix}/game/status`, data, headers())
export const validateUpdateGuess = async (data) => await axios.post(`${rendlePrefix}/game/word/validate`, data, headers())

const rendleGameTypesApi = async () => await axios.get(`${rendlePrefix}`)

const calculateExpirationTime = (now, expiresAt) =>
	new Date(expiresAt).getTime() - new Date(now).getTime()

export const loadRendleGames = async () => {
	try {
		const rendles = await rendleGameTypesApi();
		let data = rendles.data.rendleContests
		const now = new Date(rendles.data.currentTime)

		let temp = []
		let temp_m = []

		data[0].line = Line2Img
		data[1].line = Line1Img
		data[2].line = Line2Img

		const nonExpiredRendles = []

		for (let i = 0; i < data.length; i++) {
			if (data[i].isExpired === true) {
				temp[0] = data[i]
				temp[0].css = "_fade"
				temp_m[2] = data[i]
				temp_m[2].css = "_fade"
			} else {
				nonExpiredRendles.push(data[i])
			}
		}

		const rendle1Expiration = calculateExpirationTime(now, nonExpiredRendles[0].expiresAt)
		const rendle2Expiration = calculateExpirationTime(now, nonExpiredRendles[1].expiresAt)

		if (rendle1Expiration > 0 && rendle2Expiration > 0) {

			if (rendle1Expiration > rendle2Expiration) {
				temp[1] = nonExpiredRendles[1]
				temp[1].css = "_scale"
				temp_m[0] = nonExpiredRendles[1]
				temp_m[0].css = "_scale"

				temp[2] = nonExpiredRendles[0]
				temp[2].css = "_fade"
				temp_m[1] = nonExpiredRendles[0]
				temp_m[1].css = "_fade"
			} else {
				temp[1] = nonExpiredRendles[0]
				temp[1].css = "_scale"
				temp_m[0] = nonExpiredRendles[0]
				temp_m[0].css = "_scale"

				temp[2] = nonExpiredRendles[1]
				temp[2].css = "_fade"
				temp_m[1] = nonExpiredRendles[1]
				temp_m[1].css = "_fade"
			}
		} else {
			if (rendle1Expiration > 0) {
				temp[1] = nonExpiredRendles[0]
				temp[1].css = "_scale"
				temp_m[0] = nonExpiredRendles[0]
				temp_m[0].css = "_scale"

				temp[2] = nonExpiredRendles[1]
				temp[2].css = "_fade"
				temp_m[1] = nonExpiredRendles[1]
				temp_m[1].css = "_fade"

			} else {
				temp[1] = nonExpiredRendles[1]
				temp[1].css = "_scale"
				temp_m[0] = nonExpiredRendles[1]
				temp_m[0].css = "_scale"

				temp[2] = nonExpiredRendles[0]
				temp[2].css = "_fade"
				temp_m[1] = nonExpiredRendles[0]
				temp_m[1].css = "_fade"
			}
		}

		return {
			rendles: temp, mobileViewRendles: temp_m
		}


	} catch (error) {
		console.log(error)
	}
}