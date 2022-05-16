import axios from 'axios'
import { URL, rendlePrefix, headers } from '../config';

import FiveRendleImg from '../assets/5rendle.webp'
import SixRendleImg from '../assets/6rendle.webp'
import SevenRendleImg from '../assets/7rendle.webp'
import Line1Img from '../assets/line1.webp'
import Line2Img from '../assets/line2.webp'
import RendleFive from '../assets/rendle_5.webp'
import RendleSix from '../assets/rendle_6.webp'
import RendleSeven from '../assets/rendle_7.webp'

export const enterContest = async (data) => await axios.post(`${URL}${rendlePrefix}/enter`, data, headers)
export const saveRendleGame = async (data) => await axios.post(`${URL}${rendlePrefix}/save`, data, headers)
export const getContestantStatus = async (data) => await axios.post(`${URL}${rendlePrefix}/status`, data, headers)
export const updateGuesses = async (data) => await axios.post(`${URL}${rendlePrefix}/words/update`, data, headers)
export const getGuesses = async (data) => await axios.post(`${URL}${rendlePrefix}/words`, data, headers)

const rendleGameTypesApi = async () => await axios.get(`${URL}${rendlePrefix}`)

export const loadRendleGames = async () => {
	try {
		const rendles = await rendleGameTypesApi();
		console.log(rendles)
		let data = rendles.data.rendleGameTypes

		data[0].img = FiveRendleImg
		data[0].line = Line2Img
		data[0].banner = RendleFive

		data[1].img = SixRendleImg
		data[1].line = Line1Img
		data[1].banner = RendleSix

		data[2].img = SevenRendleImg
		data[2].line = Line2Img
		data[2].banner = RendleSeven

		// for (let i in data) {
		// 	const now = new Date(Date.now())
		// 	const time = new Date(data[i].starts_on)
		// 	const isLive = time.getTime() - now.getTime()

		// 	if (isLive < 0 && isLive > -1000 * 60 * 60 * 8) {
		// 		temp[1] = data[i]
		// 		temp[1].css = "_scale"
		// 		temp_m[0] = data[i]
		// 		temp_m[0].css = "_scale"
		// 	}
		// 	if (isLive < - 1000 * 60 * 60 * 8) {
		// 		temp[0] = data[i]
		// 		temp[0].css = "_fade"
		// 		temp_m[2] = data[i]
		// 		temp_m[2].css = "_fade"
		// 	}
		// 	if (isLive > 0) {
		// 		temp[2] = data[i]
		// 		temp[2].css = "_fade"
		// 		temp_m[1] = data[i]
		// 		temp_m[1].css = "_fade"
		// 	}

		// 	if (isLive) data[i].live = true
		// 	else data[i].live = false
		// }

		return {
			mobileViewRendles: [...data],
			rendles: [...data]
		}

	} catch (error) {
		console.log(error)
	}
}