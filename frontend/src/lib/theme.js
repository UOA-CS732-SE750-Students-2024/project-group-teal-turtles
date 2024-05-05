"use client";
import { Lato } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const lato = Lato({
	weight: ["100", "300", "400", "700", "900"],
	subsets: ["latin"],
	display: "swap"
});

const theme = createTheme({
	typography: {
		fontFamily: lato.style.fontFamily
	},
	palette: {
		primary: {
			main: "#FF7600",
			light: "#FFA600",
			dark: "#F44836"
		},
		secondary: {
			main: "#7E7E7E",
			dark: "#000000"
		},
		background: {
			default: "#E3F0FA",
			paper: "#FFFFFF"
		}
	}
});

export default theme;
