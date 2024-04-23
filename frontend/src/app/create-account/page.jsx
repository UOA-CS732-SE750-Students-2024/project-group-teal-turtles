"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, Divider } from "@mui/material";
import React from "react";

function CreateAccount() {
	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 3 }}>
				<Stack alignItems="center" spacing={3}>
					<Typography variant="h3">Sign Up</Typography>
					<Typography variant="h5">No Account? We'll create one for you automatically.</Typography>
					<TextField fullWidth label="Username" />
					<TextField fullWidth label="Email Address" />
					<TextField fullWidth label="Password" />
					<Stack width="100%" alignItems="center" spacing={1.5}>
						<Button fullWidth variant="contained" sx={{ textTransform: "none" }}>
							<Typography variant="h6">Create Account</Typography>
						</Button>
						<Typography variant="h6">OR</Typography>

						<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none" }}>
							<Typography variant="h6">Sign in with Google</Typography>
						</Button>
						<Button fullWidth href="/login" sx={{ textTransform: "none" }}>
							<Typography variant="h6">Sign in to an existing account</Typography>
						</Button>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}

export default CreateAccount;
