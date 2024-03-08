import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../constant";

//fetch 
export const fetcher = axios.create({
  baseURL: BASE_URL,
});

export const respInterceptor= fetcher.interceptors.request.use((config) => {
  // add authorization
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.access_token}`;
  }
  return config;
});
fetcher.interceptors.response.use((response) => {
  return response;
});

//refetch on 401
export const refreshFetecher = axios.create({
  baseURL: BASE_URL,
});

export const refreshInterceptor= refreshFetecher.interceptors.request.use((config) => {
  // add authorization
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user) {
    //add refresh token
    config.headers["Authorization"] = `Bearer ${user.refresh_token}`;
  }
  return config;
});
refreshFetecher.interceptors.response.use((response) => {
  return response;
});



export const getdDisplayDataAPI = async () => {
  try {
    //get data
    const resp = await fetcher.get("/api/v1/user/fetch");
    return resp.data;
  } catch (error) {
    switch (error.response.status) {
      case 401:
      {  
        //retry to fetch
        try {
            //get new access token
            const req = await refreshFetecher.get("/api/v1/token/refresh");
            // --update interceptor on fetcher--
            fetcher.interceptors.request.eject(respInterceptor) //eject old interceptor
            //update interceptor with new access token
            fetcher.interceptors.request.use((config) => {
                // add authorization
                const user = JSON.parse(localStorage.getItem(CURRENT_USER));
                if (user) {
                    //new access token
                  config.headers["Authorization"] = `Bearer ${req.access_token}`;
                }
                return config;
              });
              fetcher.interceptors.response.use((response) => {
                return response;
              });
            //retry calling  
            const retryResp = await fetcher.get("/api/v1/user/fetch");
            return retryResp.data
        } catch (error) {
            throw error
        }
      }
      case 429:
        alert("Client are spamming too many request");
        throw error;
      default:
        throw error;
    }
  }
};
