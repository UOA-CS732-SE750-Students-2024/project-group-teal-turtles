import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/lib/theme";

export const metadata = {
	title: "Intelligent Eats"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body style={{ minWidth: "600px" }}>
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</body>
		</html>
	);
}
