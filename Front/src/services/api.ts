import axios from "axios";
import { auth } from "../firebase/firebase";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(async (config) => {
 const token = localStorage.getItem("token");

 if(token){
  config.headers.Authorization = `Bearer ${token}`
  
 }

 return config
}, (error) => {
  return Promise.reject(error)
})