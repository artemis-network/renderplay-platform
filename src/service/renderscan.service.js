import axios from 'axios';

import { headers, renderScanPrefix } from '../config'

export const getRenderScanTypes = async () => {
	try {
		return await axios.get(`${renderScanPrefix}`)
	} catch (e) {
		return e
	}
}

export const getRenderScanPlayerStatus = async (body) => {
	try {
		return await axios.post(`${renderScanPrefix}/status`, body)
	} catch (e) {
		return e
	}
}

export const enterRenderScanGame = async (body) => {
	try {
		return await axios.post(`${renderScanPrefix}/enter`, body)
	} catch (e) {
		return e
	}
}

export const saveRenderScanGame = async (body) => {
	try {
		return await axios.post(`${renderScanPrefix}/save`, body)
	} catch (e) {
		return e
	}
}