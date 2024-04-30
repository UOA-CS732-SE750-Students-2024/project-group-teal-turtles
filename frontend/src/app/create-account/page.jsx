"use client";

import React, { useState } from "react";
import Register from "./register";
import CardWrapper from "@/components/CardWrapper/CardWrapper";

function CreateAccount() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<CardWrapper>
			<Register
				username={username}
				email={email}
				password={password}
				setUsername={setUsername}
				setEmail={setEmail}
				setPassword={setPassword}
			/>
		</CardWrapper>
	);
}

export default CreateAccount;
