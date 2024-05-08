"use client";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Auth() {
	const router = useRouter();
	useEffect(() => {
		onAuthStateChanged(getAuth(), () => {
			const authUser = getAuth().currentUser;
			if (!authUser) {
				router.push("/landing");
			}
		});
	}, []);

	return null;
}
