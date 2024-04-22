import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function createAccount(email, password) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		console.log("user created: ", userCredential.user);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

export async function login(email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log("user logged in: ", userCredential.user);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

export async function logout() {
	await signOut(auth);
}
