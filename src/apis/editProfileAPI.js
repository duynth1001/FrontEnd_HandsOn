import { fetcher, refreshFetecher, respInterceptor } from "./profileAPI";

export const updateFormAPI = async (payload)=>{
    try {
        const req = await fetcher.post("/api/v1/data/update",payload)
        return req.data
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
}