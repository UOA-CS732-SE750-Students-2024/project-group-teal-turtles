"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import CardWrapper from "@/components/CardWrapper/CardWrapper";

function CreateAccount() {
	const [visible, setVisible] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<CardWrapper>
			<Stack alignItems="center" spacing={3}>
				<Typography variant="h3">Sign Up</Typography>
				<Typography variant="h5">Don't have an account? We'll create one for you.</Typography>
				<TextField
					fullWidth
					label="Username"
					value={username}
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
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
						<Typography variant="h6">Create Account</Typography>
					</Button>
					<Typography variant="h6">OR</Typography>

					<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none", py: 1.5 }}>
						<Typography variant="h6">Sign in with Google</Typography>
					</Button>
					<Link href="/login" underline="hover">
						<Typography variant="h6">Sign in to an existing account</Typography>
					</Link>
				</Stack>
			</Stack>
		</CardWrapper>
	);
}

export default CreateAccount;
