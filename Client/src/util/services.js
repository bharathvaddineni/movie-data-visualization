import axios from "axios";
export const baseUrl = "http://localhost:5000/api/movies";


export const getRequest = async()=>{
  return await axios.get(`${baseUrl}`)
}