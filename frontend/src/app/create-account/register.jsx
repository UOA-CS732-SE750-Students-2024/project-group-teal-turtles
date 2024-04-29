import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

function Register({ username, email, password, setUsername, setEmail, setPassword }) {
	const [visible, setVisible] = useState(false);

	return (
		<Stack alignItems="center" spacing={3}>
			<Typography variant="h3">Sign Up</Typography>
			<Typography variant="h5">Don't have an account? We'll create one for you.</Typography>
			<TextField
				fullWidth
				label="Unpm sername"
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
						<IconButton onClick={() => setVisible(!visible)}>{visible ? <VisibilityOff /> : <Visibility />}</IconButton>
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
	);
}

export default Register;
