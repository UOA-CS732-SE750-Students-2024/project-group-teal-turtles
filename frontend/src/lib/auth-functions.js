import { auth } from "@/lib/firebase-config.js";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider
} from "firebase/auth";

export async function createAccount(email, password) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

export async function login(email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

export async function logout() {
	await signOut(auth);
}

export async function handleGoogleLogin() {
	try {
		const provider = new GoogleAuthProvider();
		const userCredential = await signInWithPopup(auth, provider);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}
