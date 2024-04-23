import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, Divider } from "@mui/material";
import React from "react";

function CreateAccount() {
	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 6 }}>
				<Stack alignItems="center" spacing={1}>
					<Typography variant="h4">Sign Up</Typography>
					<Typography variant="body2">No Account? We'll create one for you automatically.</Typography>
					<Typography variant="body1" fontWeight="bold" alignSelf="flex-start">
						Username
					</Typography>
					<TextField fullWidth size="small" label="Username" />
					<Typography variant="body1" fontWeight="bold" alignSelf="flex-start">
						Email
					</Typography>
					<TextField fullWidth size="small" label="Email Address" />
					<Typography variant="body1" fontWeight="bold" alignSelf="flex-start">
						Password
					</Typography>
					<TextField fullWidth size="small" label="Password" />
					<Button fullWidth variant="contained" sx={{ textTransform: "none" }}>
						Create account
					</Button>
					<Typography>OR</Typography>

					<Button fullWidth variant="contained" endIcon={<Google />} sx={{ textTransform: "none" }}>
						Sign in with Google
					</Button>
					<Button href="/login" sx={{ textTransform: "none" }}>
						Sign in to existing account
					</Button>
				</Stack>
			</Card>
		</Stack>
	);
}

export default CreateAccount;
