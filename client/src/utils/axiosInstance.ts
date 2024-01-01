import axios from "axios";
declare module "axios" {
  export interface AxiosRequestConfig {
    withoutAuth?: boolean;
  }
}

const baseURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL,
  withoutAuth: false,
  headers: {
    "Content-Type": "application/json",
  },
  /*
  you can pass common config here.
  */
});


axiosInstance.interceptors.request.use(
  (config) => {
    /*

    Here you can pass more logic as per requirement.
    EX: you can check if access-token is about to expiry 
    then use refresh-token to get new access-token and
    refresh-token and story in cookie then send actual
    resource request.
    
    */

    if (!config.withoutAuth) {
      
      const token: any = document!.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];
     
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
