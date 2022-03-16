import http from './http.config'

export const get_types = async () => {
	return await http.get("game-types")
}

export const post_winner = async (data) => {
	return await http.post("post-winner", data)
}

export const get_player_status = async (data) => {
	return await http.post("get-player-status", data)
}