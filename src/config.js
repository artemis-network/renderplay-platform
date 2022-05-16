
let SERVER = "PROD";
let URL = "";

if (SERVER === "DEV") URL = "http://localhost:5000";
if (SERVER === "PROD") URL = "https://api.renderverse.io";

const rendlePrefix = "/backend/v1/rendles"
const userPrefix = "/backend/v1/users"
const renderScanPrefix = "/backend/v1/renderscans"
const walletPrefix = "/backend/v1/wallets"

const headers = () => {
	return {
		headers: {
			Authorization: localStorage.getItem("accessToken")
		}
	}
};


export { URL, headers, userPrefix, rendlePrefix, renderScanPrefix, walletPrefix }; 