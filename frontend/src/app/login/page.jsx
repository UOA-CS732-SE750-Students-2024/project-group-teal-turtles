"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { login } from "@/app/auth-functions";
import { auth } from "@/app/firebase-config";
import axios from "axios";
import useDataStore from "@/lib/store";

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
	} = useDataStore();

	async function fetchUser() {
		try {
			const response = await axios.get("http://localhost:3000/api/users", {
				headers: {
					Authorization: authToken
				}
			});
			console.log(response.data);
			setUserDislikedIngredients(response.data.dislikedIngredients);
			setUserFavouriteMeals(response.data.favouriteMeals);
			setUserGeneratedMeals(response.data.generatedMeals);
			setUserIngredients(response.data.ingredients);
			setUserParameters(response.data.parameters);
			console.log(userParameters);
		} catch (error) {
			console.log("Error:", error);
		}
	}

	async function handleSignIn() {
		try {
			await login(email, password);
			setAuthToken(auth.currentUser.accessToken);
			setUserEmail(auth.currentUser.email);
			fetchUser();
		} catch (error) {
			if (error.code === "auth/invalid-credential") {
				console.log("Invalid credential. Please check your email and password.");
			} else if (error.code === "auth/too-many-requests") {
				console.log(
					"Access to this account has been temporarily disabled due to many failed login attempts. Please try again later."
				);
			} else {
				console.log("An error occurred while signing in:", error.message);
			}
		}
	}

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
					<a href="/generation-options">Generation Options</a>
				</Stack>
			</Stack>
		</CardWrapper>
	);
}

export default Login;
