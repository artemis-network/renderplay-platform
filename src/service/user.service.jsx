import http from "./http.config";

const URL = "/api/v1/users";
const NFTS = "/api/v1/nfts";

export const updateProfile = async (data) => {
  const username = localStorage.getItem("username");
  return await http.post(`${URL}/profile/${username}`, data);
};

export const getProfile = async () => {
  const data = { username: localStorage.getItem("username") };
  return await http.put(`${URL}/profile/`, data);
};

export const getUserGallery = async () => {
  const username = localStorage.getItem("username");
  return await http.get(`store/${username}`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const saveNFTMetaData = async (metadata) => {
  return await http.post(`save-nft`, metadata, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const saveImage = async (file) => {
  const formData = new FormData();
  const username = localStorage.getItem("username");
  formData.append("username", username);
  formData.append("data", file);
  return await http.post(`save`, formData, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const getUserStore = async () => {
  const username = localStorage.getItem("username");
  return await http.get(`store/${username}`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const addIpfsHash = async (filename, ipfsHash, pinSize) => {
  const data = {
    filename: filename,
    ipfsHash: ipfsHash,
    pinSize: pinSize,
  };
  return await http.post(`${NFTS}/add-ipfshash`, data, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const getNFT = async (id) => {
  return await http.get(`${NFTS}/${id}`);
};
