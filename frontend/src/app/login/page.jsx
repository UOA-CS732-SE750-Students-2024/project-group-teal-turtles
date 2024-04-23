import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, Divider } from "@mui/material";
import React from "react";

function Login() {
	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 4, borderRadius: 2 }}>
				<Stack alignItems="center" spacing={2}>
					<Typography variant="h4">Login</Typography>
					<Typography variant="body2">Sign in to access saved data and information.</Typography>
					<TextField fullWidth size="small" label="Email Address" />
					<TextField fullWidth size="small" label="Password" />
					<Stack width="100%" alignItems="center" spacing={1}>
						<Button fullWidth variant="contained" sx={{ textTransform: "none" }}>
							Sign in
						</Button>
						<Typography>OR</Typography>
						<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none" }}>
							Sign in with Google
						</Button>
						<Button fullWidth href="/create-account" sx={{ textTransform: "none" }}>
							Create a new account
						</Button>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}

export default Login;
