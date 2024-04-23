import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, Divider } from "@mui/material";
import React from "react";

function Login() {
	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 6 }}>
				<Stack alignItems="center" spacing={1}>
					<Typography variant="h4">Login</Typography>
					<Typography variant="body2">Sign in to access saved data and information.</Typography>
					<Typography variant="body1" fontWeight="bold" alignSelf="flex-start">
						Email
					</Typography>
					<TextField fullWidth size="small" label="Email Address" />
					<Typography variant="body1" fontWeight="bold" alignSelf="flex-start">
						Password
					</Typography>
					<TextField fullWidth size="small" label="Password" />
					<Button fullWidth variant="contained" sx={{ textTransform: "none" }}>
						Sign in
					</Button>
					<Typography>OR</Typography>
					<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none" }}>
						Sign in with Google
					</Button>
					<Button href="/create-account" sx={{ textTransform: "none" }}>
						Create a new account
					</Button>
				</Stack>
			</Card>
		</Stack>
	);
}

export default Login;
