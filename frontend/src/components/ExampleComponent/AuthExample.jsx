"use client";
import React from "react";
import styles from "./ExampleComponent.module.css";
import { createAccount, login } from "@/app/auth-functions";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";

function AuthExample() {
	const [user, setUser] = useState({ email: "loading" });

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
			// console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	// handleAccountCreation("123@gmail.com", "123456");
	handleLogin("123@gmail.com", "123456");

	return (
		<>
			<div className={styles.exampleCSS}>{user.email}</div>
			<div>This is an example component!</div>
		</>
	);
}

export default AuthExample;
