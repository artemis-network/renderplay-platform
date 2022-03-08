import http from "./http.config";

export const signUp = async (data) => {
  return await http.post("/register", data);
};

export const login = async (data) => {
  return await http.post("/authenticate", data);
};

export const loginGoogle = async (data) => {
  return await http.post("/google-register", data);
};

export const testDummy = async (data) => {
  return await http.post("/test-dummy", data);
};

export const ping = async (data) => {
  return await http.get("/ping");
};

export const createSession = (data) => {
  localStorage.setItem("publicToken", data.publicToken);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("username", data.username);
};

export const isLoggedIn = () => {
  const isLogged = localStorage.getItem("publicToken");
  if (isLogged === null || isLogged === undefined) return false;
  else if (isLogged === "[GUEST]") return false;

  return true;
};
