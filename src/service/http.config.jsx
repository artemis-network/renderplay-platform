import axios from "axios";

let SERVER = "DEV";
let URL = "";

if (SERVER === "DEV") URL = "http://127.0.0.1:5000/";
else if (SERVER === "PROD") URL = "https://artemisnetwork.azurewebsites.net/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers["Authorization"] = token;
    config.baseURL = URL;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axios;
