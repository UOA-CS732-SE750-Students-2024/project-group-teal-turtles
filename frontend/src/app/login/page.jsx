"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { createAccount, login, logout } from "@/app/auth-functions";
import { useDataContext } from "@/lib/DataContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase-config";
import axios from "axios";

function Login() {
	const [visible, setVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {
		setUserFavouriteMeals,
		setUserGeneratedMeals,
		setUserIngredients,
		setUserDislikedIngredients,
		setUserParameters,
		userParameters,
		setUserEmail,
		setAuthToken,
		authToken
	} = useDataContext();

	onAuthStateChanged(auth, (currentUser) => {
		if (currentUser) {
			setAuthToken(currentUser.accessToken);
			setUserEmail(currentUser.email);
		} else {
			// Handle case where currentUser is null
			setAuthToken(null); // Reset authToken
			setUserEmail(""); // Reset userEmail
		}
	});

	const handleSignIn = async () => {
		try {
			await login(email, password);
			console.log(authToken);
			const userDataResponse = await axios.get("/api/users/", {
				headers: {
					Authorization: authToken
				}
			});
			const userData = userDataResponse.data;
			setUserFavouriteMeals(userData.favouriteMeals);
			setUserGeneratedMeals(userData.generatedMeals);
			setUserIngredients(userData.ingredients);
			setUserDislikedIngredients(userData.dislikedIngredients);
			setUserParameters(userData.parameters);
			console.log(userParameters);
		} catch (error) {
			console.log("Error signing in:", error);
		}
	};

	return (
		<CardWrapper>
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
					<Button fullWidth variant="contained" sx={{ textTransform: "none", py: 1.5 }} onClick={handleSignIn}>
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
		</CardWrapper>
	);
}

export default Login;
