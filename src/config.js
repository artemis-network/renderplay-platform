
let SERVER = "DEV";
let URL = "";

if (SERVER === "DEV") URL = "http://localhost:5001";
if (SERVER === "PROD") URL = "https://api.renderverse.io";

const rendlePrefix = URL + "/renderplay/v1/rendles"
const userPrefix = URL + "/renderplay/v1/users"
const renderScanPrefix = URL + "/renderplay/v1/renderscans"
const walletPrefix = URL + "/renderplay/v1/wallets"

const headers = () => {
	return {
		headers: { Authorization: localStorage.getItem("accessToken") }
	}
};


export { URL, headers, userPrefix, rendlePrefix, renderScanPrefix, walletPrefix }; 