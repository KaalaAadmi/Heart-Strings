import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "./../config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [userToken, setUserToken] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const registerUser = async (name, email, password, gender, image) => {
		setLoading(true);
		try {
			const response = await axios.post(`${BASE_URL}/auth/register`, {
				name,
				email,
				password,
				gender,
				image,
			});
			setUserInfo(response.data.savedUser);
			setUserToken(response.data.accessToken);
			console.log(`token: ${response.data.accessToken}`);
			AsyncStorage.setItem("userToken", response.data.accessToken);
			AsyncStorage.setItem("userInfo", JSON.stringify(response.data.savedUser));
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const loginUser = async (email, password) => {
		setLoading(true);
		try {
			const response = await axios.post(`${BASE_URL}/auth/login`, {
				email,
				password,
			});
			setUserInfo(response.data.savedUser);
			setUserToken(response.data.accessToken);
			console.log(`token: ${response.data.accessToken}`);
			AsyncStorage.setItem("userToken", response.data.accessToken);
			AsyncStorage.setItem("userInfo", JSON.stringify(response.data.savedUser));
			setLoading(false);
		} catch (error) {
      console.log(error);
			setLoading(false);
		}
	};

	const logout = () => {
		console.log("Logging out...");
		setLoading(true);
		setUserToken(null);
		AsyncStorage.removeItem("userToken");
		AsyncStorage.removeItem("userInfo");
		setLoading(false);
		console.log("Logged out...");
	};

	const isLoggedIn = async () => {
		try {
			setLoading(true);
			let userToken = await AsyncStorage.getItem("userToken");
			let userInfo = await AsyncStorage.getItem("userInfo");
			userInfo = JSON.parse(userInfo);
			if (userInfo) {
				setUserToken(userToken);
				setUserInfo(userInfo);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		isLoggedIn();
	}, []);
	return (
		<AuthContext.Provider
			value={{ registerUser, loginUser, logout, userToken, userInfo }}
		>
			{children}
		</AuthContext.Provider>
	);
};
