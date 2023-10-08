import {
     API_URL_GET_VIDEO,
     API_URL_GET_VIDEOS,
     // API_URL_DELETE_VIDEO,
     // API_URL_UPDATE_VIDEO,
   } from "../constants/configURL";
   import axiosClient from "./http-common";
   
   export const getVideo = (id) => {
     return axiosClient.get(API_URL_GET_VIDEO + "/" + id);
   };

   export const getAllVideos = () => {
     return axiosClient.get(API_URL_GET_VIDEOS);
   };
   
//    export const deleteVideo = (id) => {
//      return axiosClient.delete(API_URL_DELETE_VIDEO + "/" + id);
//    };
   
//    export const updateVideo = (id) => {
//      return axiosClient.put(API_URL_UPDATE_VIDEO + "/" + id);
//    };