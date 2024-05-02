"use client";

import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { Google } from "@mui/icons-material";
import { Stack, Typography, Button, TextField, IconButton, Link } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { createAccount } from "@/app/auth-functions";
import { auth } from "@/app/firebase-config";
import useDataStore from "@/lib/store";
import axios from "axios";

function CreateAccount() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const {
		setUserFavouriteMeals,
		setUserGeneratedMeals,
		setUserIngredients,
		setUserDislikedIngredients,
		setUserParameters,
		setUserEmail,
		setAuthToken
	} = useDataStore();

	async function createUserInDatabase(userAuthToken) {
		try {
			const response = await axios.post(
				"http://localhost:3000/api/users",
				{},
				{
					headers: {
						Authorization: userAuthToken
					}
				}
			);
			console.log("User created:", response.data);
			setUserDislikedIngredients(response.data.dislikedIngredients);
			setUserFavouriteMeals(response.data.favouriteMeals);
			setUserGeneratedMeals(response.data.generatedMeals);
			setUserIngredients(response.data.ingredients);
			setUserParameters(response.data.parameters);
			return response.data;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	}

	async function handleCreateAccount() {
		try {
			if (password === confirmPassword) {
				await createAccount(email, password);
				setAuthToken(auth.currentUser.accessToken);
				setUserEmail(auth.currentUser.email);
				createUserInDatabase(auth.currentUser.accessToken);
			} else {
				console.log("Passwords do not match");
			}
		} catch (error) {
			if (error.code === "auth/weak-password") {
				console.log("Firebase: Password should be at least 6 characters");
			} else if (error.code === "auth/email-already-in-use") {
				console.log("Email already in use");
			} else {
				console.log("An error occurred while signing in:", error.message);
			}
		}
	}

	return (
		<CardWrapper>
			<Stack alignItems="center" spacing={3}>
				<Typography variant="h3">Sign Up</Typography>
				<Typography variant="h5">Don't have an account? We'll create one for you.</Typography>

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
					label="Password (6+ Characters)"
					type={passwordVisible ? "text" : "password"}
					value={password}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					InputProps={{
						endAdornment: (
							<IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
								{passwordVisible ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						)
					}}
				/>
				<TextField
					fullWidth
					label="Confirm Password"
					value={confirmPassword}
					type={confirmPasswordVisible ? "text" : "password"}
					onChange={(event) => {
						setConfirmPassword(event.target.value);
					}}
					InputProps={{
						endAdornment: (
							<IconButton onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
								{confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						)
					}}
				/>
				<Stack width="100%" alignItems="center" spacing={1.5}>
					<Button fullWidth variant="contained" sx={{ textTransform: "none", py: 1.5 }} onClick={handleCreateAccount}>
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
