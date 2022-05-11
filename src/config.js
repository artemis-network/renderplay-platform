
let SERVER = "DEV";
let URL = "";

if (SERVER === "DEV") URL = "http://localhost:3001";
if (SERVER === "PROD") URL = "https://artemisnetwork.azurewebsites.net";

const rendlePrefix = "/api/v1/rendles"
const userPrefix = "/api/v1/users"
const renderScanPrefix = "/api/v1/renderscans"
const walletPrefix = "/api/v1/wallets"

const headers = () => {
	return {
		headers: {
			Authorization: localStorage.getItem("accessToken")
		}
	}
};

export { URL, headers, userPrefix, rendlePrefix, renderScanPrefix, walletPrefix }; 