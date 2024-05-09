"use client";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase-config";

/**
 * Auth component is responsible for handling authentication state changes.
 * It redirects the user to the landing page if they are not authenticated.
 * @returns {null} Null component.
 */
export default function Auth() {
	auth.app;

	const router = useRouter();
	useEffect(() => {
		onAuthStateChanged(getAuth(), () => {
			const authUser = getAuth().currentUser;
			if (!authUser) {
				router.push("/landing");
			}
		});
	}, [router]);

	return null;
}
