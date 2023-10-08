import {
     API_URL_GET_USER,
     API_URL_UPDATE_USER
} from "../constants/configURL";
import axiosClient from "./http-common";
   
   export const getUser = (id) => {
     return axiosClient.get(API_URL_GET_USER + "/" + id);
   }
   export const updateUser = (id,values) => {
    return axiosClient.put(API_URL_UPDATE_USER + "/" + id,values);
  }