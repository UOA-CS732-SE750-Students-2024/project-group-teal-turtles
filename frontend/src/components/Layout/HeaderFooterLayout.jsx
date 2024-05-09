import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Box } from "@mui/material";
import StickyFooter from "./StickyFooter";
import Auth from "./Auth";

/**
 * HeaderFooterLayout component is a layout component that wraps the main content with a responsive app bar,
 * sticky footer, and authentication component.
 * @param {React.ReactNode} children - The main content of the layout.
 * @returns {React.ReactNode} HeaderFooterLayout component.
 */

export default function HeaderFooterLayout({ children }) {
	return (
		<Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
			<ResponsiveAppBar />
			<Box sx={{ flexGrow: "1" }}>{children}</Box>
			<StickyFooter />
			<Auth />
		</Box>
	);
}
