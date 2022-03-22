import axios from "axios";

let SERVER = "PROD";
let URL = "";

if (SERVER === "DEV") URL = "http://192.168.1.14:5000/";
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
