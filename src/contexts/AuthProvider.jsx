import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/UseAxiosPublic";
import { auth } from "../firebase/firebase.config.js";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
	);
	const axiosPublic = useAxiosPublic();

	const saveUserToDB = (currentUser) => {
		const user = {
			name: currentUser.displayName,
			email: currentUser.email,
			photoURL: currentUser.photoURL,
		};

		axiosPublic
			.post("/users", user)
			.then((res) => console.log("User saved to DB", res.data))
			.catch((err) => console.log("Error while saving", err));
	};

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		});
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);

			if (currentUser) {
				saveUserToDB(currentUser);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [axiosPublic]);

	const authInfo = {
		user,
		loading,
    theme,
    setTheme,
		setLoading,
		createUser,
		updateUserProfile,
		signIn,
		googleSignIn,
		logOut,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
