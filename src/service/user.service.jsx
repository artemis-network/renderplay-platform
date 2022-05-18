import axios from "axios";
import { userPrefix, headers, walletPrefix } from "../config";

export const register = async (data) =>
  await axios.post(`${userPrefix}/register`, data);

export const login = async (data) =>
  await axios.post(`${userPrefix}/login`, data);

export const loginGoogle = async (data) =>
  await axios.post(`${userPrefix}/google-login`, data);

export const createSession = (data) => {
  localStorage.setItem("publicToken", data.publicToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("username", data.username);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("session", Date.now());
};

export const getWallet = async (data) =>
  await axios.post(`${walletPrefix}`, data, headers);
