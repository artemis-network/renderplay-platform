
let SERVER = "PROD";
let URL = "";

if (SERVER === "DEV") URL = "http://localhost:5000";
if (SERVER === "PROD") URL = "https://api.renderverse.io";

const rendlePrefix = URL + "/backend/v1/rendles"
const userPrefix = URL + "/backend/v1/users"
const renderScanPrefix = URL + "/backend/v1/renderscans"
const walletPrefix = URL + "/backend/v1/wallets"

const headers = () => {
	return {
		headers: { Authorization: localStorage.getItem("accessToken") }
	}
};


export { URL, headers, userPrefix, rendlePrefix, renderScanPrefix, walletPrefix }; 