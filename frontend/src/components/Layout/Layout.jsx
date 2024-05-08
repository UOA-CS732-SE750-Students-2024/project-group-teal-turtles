"use client";
import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Box } from "@mui/material";
import StickyFooter from "./StickyFooter";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
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
	return (
		<Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			<ResponsiveAppBar />
			<Box sx={{ flexGrow: "1" }}>{children}</Box>
			<StickyFooter />
		</Box>
	);
}
