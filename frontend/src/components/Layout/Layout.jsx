import React from "react";
import styles from "./Layout.module.css";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";

export default function Layout({ children }) {
	return (
		<div className={styles.body}>
			{/* <header className={styles.header}>
				This is a Header
				<a href="/dashboard" className={styles.headeritem}>
					Dashboard
				</a>
				<a href="/edit-profile" className={styles.headeritem}>
					Edit Profile
				</a>
				<a href="/edit-ingredients" className={styles.headeritem}>
					Edit Ingredients
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
			<main>{children}</main>
			<footer className={styles.footer}>This is a Footer</footer>
		</div>
	);
}
