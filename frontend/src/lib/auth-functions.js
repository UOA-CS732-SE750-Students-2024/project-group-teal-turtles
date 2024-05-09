import { auth } from "@/lib/firebase-config.js";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	signInWithPopup,
	GoogleAuthProvider
} from "firebase/auth";

/**
 * Function for creating a user account with email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user account.
 * @returns {Promise<UserCredential>} A promise that resolves with the user credential upon successful account creation.
 * @throws {Error} If an error occurs during the account creation process.
 */
export async function createAccount(email, password) {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}
/**
 * Function for logging in a user with email and password.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user account.
 * @returns {Promise<User>} A promise that resolves with the logged-in user upon successful login.
 * @throws {Error} If an error occurs during the login process.
 */
export async function login(email, password) {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}

/**
 * Function for logging out the current user.
 * @returns {Promise<void>} A promise that resolves upon successful logout.
 */
export async function logout() {
	await signOut(auth);
}

/**
 * Function for handling Google login.
 * @returns {Promise<User>} A promise that resolves with the user credential upon successful Google login.
 * @throws {Error} If an error occurs during the Google login process.
 */
export async function handleGoogleLogin() {
	try {
		const provider = new GoogleAuthProvider();
		const userCredential = await signInWithPopup(auth, provider);
		return userCredential.user;
	} catch (error) {
		throw error;
	}
}
