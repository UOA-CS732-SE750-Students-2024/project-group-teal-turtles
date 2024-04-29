"use client";

import { Stack, Card } from "@mui/material";
import React, { useState } from "react";
import Register from "./register";

function CreateAccount() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Stack height="100vh" justifyContent="center" alignItems="center" display="flex">
			<Card sx={{ p: 6, borderRadius: 3 }}>
				<Register
					username={username}
					email={email}
					password={password}
					setUsername={setUsername}
					setEmail={setEmail}
					setPassword={setPassword}
				/>
			</Card>
		</Stack>
	);
}

export default CreateAccount;
