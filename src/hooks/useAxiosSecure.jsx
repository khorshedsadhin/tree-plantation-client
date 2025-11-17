import axios from "axios";
import React, { use } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase.config";

const axiosSecure = axios.create({
	baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
	const navigate = useNavigate();
	const { logOut } = use(AuthContext);

	axiosSecure.interceptors.request.use(
		async (config) => {
			const user = auth.currentUser;
			if (user) {
				const token = await user.getIdToken();
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosSecure.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const status = error.response?.status;

			if (status === 401 || status === 403) {
				await logOut();
				navigate("/login");
			}
			return Promise.reject(error);
		}
	);

  return axiosSecure;
};

export default useAxiosSecure;
