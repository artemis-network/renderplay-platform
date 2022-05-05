
let SERVER = "PROD";
let URL = "";

if (SERVER === "DEV") URL = "http://192.168.1.14:5000";
if (SERVER === "PROD") URL = "https://artemisnetwork.azurewebsites.net";

export default URL; 