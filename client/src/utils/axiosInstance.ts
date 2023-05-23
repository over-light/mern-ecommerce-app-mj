import axios from "axios";

import { decodeToken, setCookie } from "./commonFunction";

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

const getRefreshToken = (refreshToken: string, config: any) => {
  axiosInstance
    .post("/auth/refresh-token", { refreshToken }, { withoutAuth: true })
    .then((res) => {
      const newAccessToken: any = decodeToken(res?.data?.user?.token);
      const newRefreshToken: any = decodeToken(res?.data?.user?.refreshToken);
      setCookie(
        "access_token",
        res?.data?.user?.token,
        new Date(newAccessToken.exp)
      );
      setCookie(
        "refresh_token",
        res?.data?.user?.refreshToken,
        newRefreshToken.exp
      );
      return axiosInstance(config);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

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
      
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const token: any = document!.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];
      const refreshToken: any = document!.cookie
        .split("; ")
        .find((row) => row.startsWith("refresh_token="))
        ?.split("=")[1];

      if (!token) {
        console.log("token", token);
      }

      config.headers.set("Authorization", `Bearer ${token}`);

      // Check Token expiration
      const accessToken: any = decodeToken(token);
      const expiration = new Date(accessToken.exp * 1000);
      const now = new Date();
      const fiveMinutes = 1000 * 60 * 5;

      if (expiration.getTime() - now.getTime() < fiveMinutes) {
        // Generate new Token
        getRefreshToken(refreshToken, config);
      }
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
      const refreshToken: any = document!.cookie
        .split("; ")
        .find((row) => row.startsWith("refresh_token="))
        ?.split("=")[1];
      // Generate new Token
      getRefreshToken(refreshToken, error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
