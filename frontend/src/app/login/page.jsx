"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

function Login() {
	const [visible, setVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 3 }}>
				<Stack alignItems="center" spacing={3}>
					<Typography variant="h3">Login</Typography>
					<Typography variant="h5">Sign in to access saved recipes and information.</Typography>
					<TextField
						fullWidth
						label="Email Address"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<TextField
						fullWidth
						label="Password (8+ Characters)"
						type={visible ? "text" : "password"}
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
						InputProps={{
							endAdornment: (
								<IconButton onClick={() => setVisible(!visible)}>
									{visible ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							)
						}}
					/>
					<Stack width="100%" alignItems="center" spacing={1.5}>
						<Button fullWidth variant="contained" sx={{ textTransform: "none", py: 1.5 }}>
							<Typography variant="h6">Sign In</Typography>
						</Button>
						<Typography variant="h6">OR</Typography>
						<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none", py: 1.5 }}>
							<Typography variant="h6">Sign in with Google</Typography>
						</Button>
						<Link href="/create-account" underline="hover">
							<Typography variant="h6">Create a new account</Typography>
						</Link>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}

export default Login;
