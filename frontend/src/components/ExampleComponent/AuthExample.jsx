"use client";
import React from "react";
import styles from "./ExampleComponent.module.css";
import { createAccount, login, logout } from "@/app/auth-functions";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import axios from "axios";

function AuthExample() {
	//this needs to be known by all pages, so need to add to an appcontext somehow
	const [user, setUser] = useState(false);
	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});

	const handleAccountCreation = async (email, password) => {
		try {
			await createAccount(email, password);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogin = async (email, password) => {
		try {
			await login(email, password);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	};

	const fetchData = async (accessToken) => {
		try {
			const res = await axios.get("http://localhost:3000/api/users", {
				headers: {
					authorisation: accessToken
				}
			});
			console.log("User data:", res.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	//reason for logging in is to retrieve the accesstoken so that we can put it in headers for requests to backend
	return (
		<>
			<div className={styles.exampleCSS}>{user ? user.accessToken : "logged out"}</div>
			<div>This is an example component!</div>

			<button
				onClick={() => {
					console.log("logging in ");
					handleLogin("1234@gmail.com", "1234567");
				}}
			>
				Login
			</button>

			<button
				onClick={() => {
					console.log("creating account");
					handleAccountCreation("1234@gmail.com", "1234567");
				}}
			>
				createAccount
			</button>

			<button
				onClick={() => {
					console.log("logging out");
					handleLogout();
				}}
			>
				logout
			</button>

			<button
				onClick={() => {
					console.log(user.accessToken);
					fetchData(user.accessToken);
				}}
			>
				Fetch Data
			</button>
		</>
	);
}

export default AuthExample;
