import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "softeng750-93ec2.firebaseapp.com",
	projectId: "softeng750-93ec2",
	storageBucket: "softeng750-93ec2.appspot.com",
	messagingSenderId: "31645618690",
	appId: "1:31645618690:web:732d311a9d0d9f5f73cd1b",
	measurementId: "G-8CCXXYXBSD"
};
console.log(firebaseConfig.apiKey);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
