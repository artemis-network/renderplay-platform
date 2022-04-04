import http from './http.config'

const prefix = "rendles"

export const get_rendles = async () => await http.get(`${prefix}/get-rendles`)
export const save_contest_result = async (data) => await http.post(`${prefix}/post-contest-result`, data)
export const get_contest_status = async (data) => await http.post(`${prefix}/get-contest-status`, data)
export const update_word = async (data) => await http.post(`${prefix}/post-word`, data)
export const get_guesses = async (data) => await http.post(`${prefix}/get-current-guesses`, data)
export const enter_contest = async (data) => await http.post(`${prefix}/enter-contest`, data)

