import axios from 'axios';

import { renderScanPrefix } from '../config'

import SportsPngPaid from '../assets/renderscan/types/paid/sports_paid.png'
import AnimalsPngPaid from '../assets/renderscan/types/paid/animals_paid.png'
import GeographyPngPaid from '../assets/renderscan/types/paid/geography_paid.png'
import GeneralPngPaid from '../assets/renderscan/types/paid/general_paid.png'
import CelebrityPngPaid from '../assets/renderscan/types/paid/celebrity_paid.png'

import SportsPngFree from '../assets/renderscan/types/free/sports_free.png'
import GeographyPngfree from '../assets/renderscan/types/free/geography_free.png'
import AnimalsPngFree from '../assets/renderscan/types/free/animals_free.png'
import GeneralPngFree from '../assets/renderscan/types/free/general_free.png'
import CelebrityPngFree from '../assets/renderscan/types/free/celebrity_free.png'


import Line from '../assets/rendle/rendle/line1.webp'

export const getRenderScanPlayerStatus = async (body) =>
	await axios.post(`${renderScanPrefix}/status`, body)

export const enterRenderScanGame = async (body) =>
	await axios.post(`${renderScanPrefix}/enter`, body)

export const saveRenderScanGame = async (body) =>
	await axios.post(`${renderScanPrefix}/save`, body)

export const getRenderScanQuizQuestion = async (body) =>
	await axios.post(`${renderScanPrefix}/questions`, body)

export const getRenderScanLobbyStatus = async (body) =>
	await axios.post(`${renderScanPrefix}/lobby-status`, body)

export const getRenderScanGameTypes = async () => {
	const modifiedTypes = [];
	const { data: { renderscanContests } } = await axios.get(`${renderScanPrefix}`)
	const types = renderscanContests

	for (let i = 0; i < types.length; i++) {
		modifiedTypes.push(types[i])
		const type = await typeFinder(types[i].gameType);
		modifiedTypes[i].line = Line

		if (types[i].category === "[SPORTS]") {
			modifiedTypes[i].img = type.sports
			modifiedTypes[i].bg = "sports"
		}

		if (types[i].category === "[GEOGRAPHY]") {
			modifiedTypes[i].img = type.geography
			modifiedTypes[i].bg = "geography"
		}

		if (types[i].category === "[CELEBRITY]") {
			modifiedTypes[i].img = type.celebrity
			modifiedTypes[i].bg = "celebrity"
		}

		if (types[i].category === "[GENERAL]") {
			modifiedTypes[i].img = type.general
			modifiedTypes[i].bg = "general"
		}

		if (types[i].category === "[ANIMALS]") {
			modifiedTypes[i].img = type.animals
			modifiedTypes[i].bg = "animals"
		}
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

