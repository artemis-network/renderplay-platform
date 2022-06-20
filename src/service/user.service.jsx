import axios from "axios";
import { userPrefix, headers, walletPrefix } from "../config";

export const register = async (data) =>
  await axios.post(`${userPrefix}/register`, data);

export const login = async (data) =>
  await axios.post(`${userPrefix}/login`, data);

export const loginGoogle = async (data) =>
  await axios.post(`${userPrefix}/google-login`, data);

export const forgotPasswordRequest = async (data) =>
  await axios.post(`${userPrefix}/forgot-password/request`, data);

export const changePasswordRequest = async (data, params) =>
  await axios.post(`${userPrefix}/change-password/${params}`, data);

export const validateToken = async (params) =>
  await axios.post(`${userPrefix}/validate/${params}`);

export const createSession = (data) => {
  localStorage.setItem("publicToken", data.publicToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("username", data.username);
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("session", new Date());
};

export const getWallet = async (data) =>
  await axios.post(`${walletPrefix}`, data, headers);

export const setWalletAddress = async (data) =>
  await axios.post(`${userPrefix}/set-wallet-address`, data);
