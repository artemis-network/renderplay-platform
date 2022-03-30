import http from './http.config'

export const get_types = async () => await http.get("game-types")
export const post_winner = async (data) => await http.post("post-winner", data)
export const get_player_status = async (data) => await http.post("get-player-status", data)
export const post_word = async (data) => await http.post("post-word", data)
export const get_guesses = async (data) => await http.post("get-current-guesses", data)
export const get_wallet = async (data) => await http.post("get-user-wallet", data)