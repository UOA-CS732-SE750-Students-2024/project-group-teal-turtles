import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { Box } from "@mui/material";
import StickyFooter from "./StickyFooter";
import Auth from "./Auth";

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
