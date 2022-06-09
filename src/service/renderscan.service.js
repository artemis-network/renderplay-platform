import axios from 'axios';

import { renderScanPrefix } from '../config'

import SportsPngPaid from '../assets/renderscan/1.png'
import AnimalsPngPaid from '../assets/renderscan/2.png'
import SportsPngFree from '../assets/renderscan/3.png'
import GeographyPngPaid from '../assets/renderscan/4.png'
import GeneralPngPaid from '../assets/renderscan/5.png'
import GeographyPngfree from '../assets/renderscan/6.png'
import AnimalsPngFree from '../assets/renderscan/7.png'
import GeneralPngFree from '../assets/renderscan/8.png'
import CelebrityPngPaid from '../assets/renderscan/9.png'
import CelebrityPngFree from '../assets/renderscan/10.png'
import Line from '../assets/rendle/rendle/line1.webp'

export const getRenderScanTypes = async () => {
	return
}

export const getRenderScanPlayerStatus = async (body) => {
	return await axios.post(`${renderScanPrefix}/status`, body)
}

export const enterRenderScanGame = async (body) => {
	return await axios.post(`${renderScanPrefix}/enter`, body)
}

export const saveRenderScanGame = async (body) => {
	return await axios.post(`${renderScanPrefix}/save`, body)
}

export const getRenderScanQuizQuestion = async (body) => {
	return await axios.post(`${renderScanPrefix}/questions`, body)
}

export const getRenderScanGameTypes = async () => {
	const modifiedTypes = [];
	const { data: { renderscanContests } } = await axios.get(`${renderScanPrefix}`)
	const types = renderscanContests
	console.log(types)
	for (let i = 0; i < types.length; i++) {
		modifiedTypes.push(types[i])
		const type = await typeFinder(types[i].gameType);
		modifiedTypes[i].line = Line
		if (types[i].category === "[SPORTS]") modifiedTypes[i].img = type.sports
		if (types[i].category === "[GEOGRAPHY]") modifiedTypes[i].img = type.geography
		if (types[i].category === "[CELEBRITY]") modifiedTypes[i].img = type.celebrity
		if (types[i].category === "[GENERAL]") modifiedTypes[i].img = type.general
		if (types[i].category === "[ANIMALS]") modifiedTypes[i].img = type.animals
	}
	return modifiedTypes
}

const typeFinder = async (type) => {
	if (type === "[FREE]") return {
		sports: SportsPngFree,
		geography: GeographyPngfree,
		celebrity: CelebrityPngFree,
		general: GeneralPngFree,
		animals: AnimalsPngFree
	}

	if (type === "[PAID]") return {
		sports: SportsPngPaid,
		geography: GeographyPngPaid,
		celebrity: CelebrityPngPaid,
		general: GeneralPngPaid,
		animals: AnimalsPngPaid,
	}
}

