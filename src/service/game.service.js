import http from './http.config'
import URL from './config';

const prefix = "rendles"

function getToken() {
	return localStorage.getItem("accessToken");
}

export const get_rendles = async () => await http.get(`${URL}/${prefix}/get-rendles`)

export const save_contest_result = async (data) => await http.post(`${URL}/${prefix}/post-contest-result`, data,
	{
		headers: {
			Authorization: getToken()
		}
	}
)
export const get_contest_status = async (data) => await http.post(`${URL}/${prefix}/get-contest-status`, data,
	{
		headers: {
			Authorization: getToken()
		}
	}
)
export const update_word = async (data) => await http.post(`${URL}/${prefix}/post-word`, data,
	{
		headers: {
			Authorization: getToken()
		}
	}
)
export const get_guesses = async (data) => await http.post(`${URL}/${prefix}/get-current-guesses`, data,
	{
		headers: {
			Authorization: getToken()
		}
	}
)
export const enter_contest = async (data) => await http.post(`${URL}/${prefix}/enter-contest`, data,
	{
		headers: {
			Authorization: getToken()
		}
	}
)

