"use client";
import React from "react";
import styles from "./ExampleComponent.module.css";
import { createAccount, login, logout } from "@/lib/auth-functions";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import axios from "axios";

/**
 * AuthExample component demonstrates authentication-related functionalities.
 * @returns {JSX.Element} A React JSX element representing the authentication example component.
 */
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
			console.error(error);
		}
	};

	const handleLogin = async (email, password) => {
		try {
			await login(email, password);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	};

	const fetchData = async (accessToken) => {
		try {
			const res = await axios.get("http://localhost:3000/api/users", {
				headers: {
					authorisation: accessToken
				}
			});
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
					handleLogin("1234@gmail.com", "1234567");
				}}
			>
				Login
			</button>

			<button
				onClick={() => {
					handleAccountCreation("1234@gmail.com", "1234567");
				}}
			>
				createAccount
			</button>

			<button
				onClick={() => {
					handleLogout();
				}}
			>
				logout
			</button>

			<button
				onClick={() => {
					fetchData(user.accessToken);
				}}
			>
				Fetch Data
			</button>
		</>
	);
}

export default AuthExample;
