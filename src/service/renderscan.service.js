import axios from 'axios';

import { renderScanPrefix } from '../config'

export const getRenderScanTypes = async () => {
	return await axios.get(`${renderScanPrefix}`)
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
	return await axios.get(`${renderScanPrefix}/types`)

}