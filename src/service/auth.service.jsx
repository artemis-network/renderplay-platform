import axios from "axios";
import { URL, userPrefix, headers, walletPrefix } from "../config";

export const register = async (data) =>
  await axios.post(`${URL}${userPrefix}/register`, data);

export const login = async (data) =>
  await axios.post(`${URL}${userPrefix}/login`, data);

export const loginGoogle = async (data) =>
  await axios.post(`${URL}${userPrefix}/google-login`, data);

export const createSession = (data) => {
  localStorage.setItem("publicToken", data.publicToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("username", data.username);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("session", Date.now());
};

export const getWallet = async (data) =>
  await axios.post(`${URL}${walletPrefix}`, data, headers);
