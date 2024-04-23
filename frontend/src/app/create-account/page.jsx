"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, Divider } from "@mui/material";
import React from "react";

function CreateAccount() {
	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 4, borderRadius: 2 }}>
				<Stack alignItems="center" spacing={2}>
					<Typography variant="h4">Sign Up</Typography>
					<Typography variant="body2">No Account? We'll create one for you automatically.</Typography>
					<TextField fullWidth size="small" label="Username" />
					<TextField fullWidth size="small" label="Email Address" />
					<TextField fullWidth size="small" label="Password" />
					<Stack width="100%" alignItems="center" spacing={1}>
						<Button fullWidth variant="contained" sx={{ textTransform: "none" }}>
							Create Account
						</Button>
						<Typography alignSelf="center">OR</Typography>

						<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none" }}>
							Sign in with Google
						</Button>
						<Button fullWidth href="/login" sx={{ textTransform: "none" }}>
							Sign in to existing account
						</Button>
					</Stack>
				</Stack>
			</Card>
		</Stack>
	);
}

export default CreateAccount;
