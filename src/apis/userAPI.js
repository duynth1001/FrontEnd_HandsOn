import axios from "axios";
import { BASE_URL } from "../constant";

export const SigninAPI = async (payload) => {
  try {
    //post data
    const resp = await axios.post(
      BASE_URL,
      {
        payload,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return resp.data;
  } catch (error) {
    switch (error.response.status) {
      case 400:
        alert(
          "Invalid form of email or password (email/password are missing or too long)"
        );
        throw error;
      case 401:
        alert("Unauthorized");
        throw error;
      case 429:
        alert("Client are spamming too many request");
        throw error;
      default:
        throw error;
    }
  }
};
