"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

function Login() {
	const [visible, setVisible] = useState(false);

	const handleToggle = () => {
		setVisible(!visible);
	};

	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 3 }}>
				<Stack alignItems="center" spacing={3}>
					<Typography variant="h3">Login</Typography>
					<Typography variant="h5">Sign in to access saved data and information.</Typography>
					<TextField fullWidth label="Email Address" />
					<TextField
						fullWidth
						label="Password"
						type={visible ? "text" : "password"}
						InputProps={{
							endAdornment: (
								<IconButton onClick={handleToggle}>{visible ? <VisibilityOff /> : <Visibility />}</IconButton>
							)
						}}
					/>
					<Stack width="100%" alignItems="center" spacing={1.5}>
						<Button fullWidth variant="contained" sx={{ textTransform: "none" }}>
							<Typography variant="h6">Sign In</Typography>
						</Button>
						<Typography variant="h6">OR</Typography>
						<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none" }}>
							<Typography variant="h6">Sign in with Google</Typography>
						</Button>
						<Button fullWidth href="/create-account" sx={{ textTransform: "none" }}>
							<Typography variant="h6">Create a new account</Typography>
						</Button>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}

export default Login;
