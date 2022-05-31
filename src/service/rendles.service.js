import axios from 'axios'
import { rendlePrefix, headers } from '../config';

import FiveRendleImg from '../assets/rendle/rendle/5rendle.webp'
import SixRendleImg from '../assets/rendle/rendle/6rendle.webp'
import SevenRendleImg from '../assets/rendle/rendle/7rendle.webp'
import Line1Img from '../assets/rendle/rendle/line1.webp'
import Line2Img from '../assets/rendle/rendle/line2.webp'
import RendleFive from '../assets/rendle/rendle/rendle_5.webp'
import RendleSix from '../assets/rendle/rendle/rendle_6.webp'
import RendleSeven from '../assets/rendle/rendle/rendle_7.webp'

export const enterContest = async (data) => await axios.post(`${rendlePrefix}/enter`, data, headers)
export const saveRendleGame = async (data) => await axios.post(`${rendlePrefix}/save`, data, headers)
export const getContestantStatus = async (data) => await axios.post(`${rendlePrefix}/status`, data, headers)
export const updateGuesses = async (data) => await axios.post(`${rendlePrefix}/words/update`, data, headers)
export const getGuesses = async (data) => await axios.post(`${rendlePrefix}/words`, data, headers)

const rendleGameTypesApi = async () => await axios.get(`${rendlePrefix}`)

export const loadRendleGames = async () => {
	try {
		const rendles = await rendleGameTypesApi();
		let data = rendles.data.rendleGameTypes
		console.log(data)

		let temp = []
		let temp_m = []

		data[0].img = FiveRendleImg
		data[0].line = Line2Img
		data[0].banner = RendleFive

		data[1].img = SixRendleImg
		data[1].line = Line1Img
		data[1].banner = RendleSix

		data[2].img = SevenRendleImg
		data[2].line = Line2Img
		data[2].banner = RendleSeven

		if (data[0]) {
			for (let i = 0; i < data.length; i++) {
				const now = new Date(Date.now())
				const time = new Date(data[i].startsOn)
				const isLive = time.getTime() - now.getTime()

				if (isLive < 0 && isLive > -1000 * 60 * 60 * 8) {
					temp[1] = data[i]
					temp[1].css = "_scale"
					temp_m[0] = data[i]
					temp_m[0].css = "_scale"
				}
				if (isLive < - 1000 * 60 * 60 * 8) {
					temp[0] = data[i]
					temp[0].css = "_fade"
					temp_m[2] = data[i]
					temp_m[2].css = "_fade"
				}
				if (isLive > 0) {
					temp[2] = data[i]
					temp[2].css = "_fade"
					temp_m[1] = data[i]
					temp_m[1].css = "_fade"
				}
				if (isLive) data[i].live = true
				else data[i].live = false
			}
		}

		return {
			mobileViewRendles: [...data],
			rendles: [...data]
		}

	} catch (error) {
		console.log(error)
	}
}