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
			main: "#F57C00",
			light: "#FFA600",
			dark: "#F44836"
		},
		secondary: {
			main: "#7E7E7E",
			dark: "#000000"
		},
		background: {
			default: "#F0F5F9",
			paper: "#FFFFFF"
		}
	}
});

export default theme;
