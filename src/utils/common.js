import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

const doRequest = async (method, url, { data, isUploadImg } = {}) => {
  let response = {};
  const token = localStorage.getItem("access_token");
  const reqHeader = isUploadImg
    ? ''
    : {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };

  try {
    switch (method) {
      case "get":
        response = await axiosClient.get(url, reqHeader);
        break;
      case "post":
        response = await axiosClient.post(url, data, reqHeader);
        break;
      case "put":
        response = await axiosClient.put(url, data, reqHeader);
        break;
      case "delete":
        response = await axiosClient.delete(url, data, reqHeader);
        break;
      default:
        break;
    }
    return response;
  } catch (error) {
    return true;
  }
};

const getUsername = () => {
  let username = sessionStorage.getItem("username");

  if (username === null || username === "undefined") {
    username = Cookies.get("username");
    if (username !== null && username !== undefined) {
      sessionStorage.setItem("username", username);
    } else {
      return null;
    }
  }
  return username;
};

export {
  doRequest,
  getUsername
}

export const uploadImageToCloudinary = async (file, folder) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", folder);

  const response = await doRequest(
    "post",
    "https://api.cloudinary.com/v1_1/dklkzeill/image/upload",
    { data: formData, isUploadImg: true }
  );

  return response.data.public_id;
};
