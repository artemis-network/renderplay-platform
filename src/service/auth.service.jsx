import http from "./http.config";

const prefix = "users";

export const signUp = async (data) =>
  await http.post(`${prefix}/register`, data);
export const login = async (data) =>
  await http.post(`${prefix}/authenticate`, data);
export const loginGoogle = async (data) =>
  await http.post(`${prefix}/google-register`, data);

export const createSession = (data) => {
  localStorage.setItem("publicToken", data.publicToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("username", data.username);
  localStorage.setItem("session", Date.now());
};

export const get_wallet = async (data) =>
  await http.post(`${prefix}/get-user-wallet`, data);
