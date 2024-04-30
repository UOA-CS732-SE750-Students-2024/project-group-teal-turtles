import React from "react";
import styles from "./Layout.module.css";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
import { Box } from "@mui/material";

export default function Layout({ children }) {
	return (
		<Box>
			{/* <header className={styles.header}>
				This is a Header
				<a href="/dashboard" className={styles.headeritem}>
					Dashboard
				</a>
				<a href="/edit-profile" className={styles.headeritem}>
					Edit Profile
				</a>
				<a href="/pantry" className={styles.headeritem}>
					Pantry
				</a>
				<a href="/generation-options" className={styles.headeritem}>
					Generation Options
				</a>
				<a href="/landing" className={styles.headeritem}>
					Landing
				</a>
				<a href="/view-recipe" className={styles.headeritem}>
					View Recipe
				</a>
			</header> */}
			<ResponsiveAppBar />
			<Box sx={{ mt: 0 }}>{children}</Box>
			<footer className={styles.footer}>This is a Footer</footer>
		</Box>
	);
}
