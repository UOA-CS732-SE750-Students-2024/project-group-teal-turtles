"use client";
import React from "react";
import styles from "./ExampleComponent.module.css";
import { createAccount, login } from "@/app/auth-functions";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import axios from "axios";

function AuthExample() {
	const [user, setUser] = useState(false);

	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
		// console.log(user);
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

	// handleAccountCreation("1234@gmail.com", "1234567");
	useEffect(() => {
		handleLogin("1234@gmail.com", "1234567");
	}, []);

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

	return (
		<>
			<div className={styles.exampleCSS}>{user.accessToken}</div>
			<div>This is an example component!</div>
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
