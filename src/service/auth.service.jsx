import http from "./http.config";
import URL from "./config";

const prefix = "users";

function getToken() {
  return localStorage.getItem("accessToken");
}

export const signUp = async (data) =>
  await http.post(`${URL}/${prefix}/register`, data);

export const login = async (data) =>
  await http.post(`${URL}/${prefix}/authenticate`, data);

export const loginGoogle = async (data) =>
  await http.post(`${URL}/${prefix}/google-register`, data);

export const createSession = (data) => {
  localStorage.setItem("publicToken", data.publicToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("username", data.username);
  localStorage.setItem("session", Date.now());
};

export const get_wallet = async (data) =>
  await http.post(`${URL}/${prefix}/get-user-wallet`, data, {
    headers: {
      Authorization: getToken(),
    },
  });
