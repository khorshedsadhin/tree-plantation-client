import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tree-plantation-server-dun.vercel.app"
})

const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic;