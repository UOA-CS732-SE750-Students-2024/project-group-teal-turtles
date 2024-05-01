import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { BottomNavigation, Box } from "@mui/material";
import StickyFooter from "./StickyFooter";

export default function Layout({ children }) {
	return (
		<Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
			<Box sx={{ flexGrow: "1" }}>{children}</Box>
			{/* <BottomNavigation sx={{ flexGrow: "0" }}>This is a bottom navigation</BottomNavigation> */}
			<StickyFooter />
		</Box>
	);
}
