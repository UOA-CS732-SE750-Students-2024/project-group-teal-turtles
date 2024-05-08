"use client";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase-config";

export default function Auth() {
	auth.app;

	const router = useRouter();
	useEffect(() => {
		onAuthStateChanged(getAuth(), () => {
			const authUser = getAuth().currentUser;
			if (!authUser) {
				console.log("not authed");
				router.push("/landing");
			}
		});
	}, []);

	return null;
}
