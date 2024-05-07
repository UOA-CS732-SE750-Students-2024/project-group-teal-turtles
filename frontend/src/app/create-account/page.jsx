"use client";

import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { Google } from "@mui/icons-material";
import { Stack, Typography, Button, TextField, IconButton, Link, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { createAccount } from "@/app/auth-functions";
import { auth } from "@/app/firebase-config";
import useDataStore from "@/lib/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handleGoogleLogin } from "@/app/auth-functions";

function CreateAccount() {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorToPrint, setErrorToPrint] = useState(null);
	const [loading, setLoading] = useState(false);
	const [googleLoading, setGoogleLoading] = useState(false);
	const {
		setUserFavouriteMeals,
		setUserGeneratedMeals,
		setUserIngredients,
		setUserDislikedIngredients,
		setUserParameters,
		setUserEmail,
		setAuthorisedUser
	} = useDataStore();
	const router = useRouter();

	async function fetchUser(userAuthToken) {
		try {
			const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/users", {
				headers: {
					Authorization: userAuthToken
				}
			});

			console.log(response.data);
			setUserDislikedIngredients(response.data.dislikedIngredients);
			setUserFavouriteMeals(response.data.favouriteMeals);
			setUserGeneratedMeals(response.data.generatedMeals);
			setUserIngredients(response.data.ingredients);
			setUserParameters(response.data.parameters);
			router.push("/dashboard");
		} catch (error) {
			if (error.response && error.response.data.error === "User not found") {
			} else {
				console.log("Error:", error);
			}
		}
	}

	async function createUserInDatabase(userAuthToken) {
		try {
			const response = await axios.post(
				process.env.NEXT_PUBLIC_BACKEND_URL + "/users",
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
			router.push("/landing");
			return response.data;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	}

	async function handleCreateAccount() {
		try {
			setLoading(true);
			if (password === confirmPassword) {
				await createAccount(email, password);
				setAuthorisedUser(auth.currentUser);
				setUserEmail(auth.currentUser.email);
				createUserInDatabase(auth.currentUser.accessToken);
			} else {
				setErrorToPrint("Passwords do not match");
			}
		} catch (error) {
			setLoading(false);
			if (error.code === "auth/weak-password") {
				setErrorToPrint("Firebase: Password should be at least 6 characters");
			} else if (error.code === "auth/email-already-in-use") {
				setErrorToPrint("Email already in use");
			} else {
				console.log("An error occurred while signing up:", error.message);
				setErrorToPrint("An error occurred while signing up. Please try again");
			}
		}
	}
	async function handleGoogleSignIn() {
		try {
			setGoogleLoading(true);
			await handleGoogleLogin();
			setUserEmail(auth.currentUser.email);
			setAuthorisedUser(auth.currentUser);

			const metadata = auth.currentUser.metadata;
			if (metadata.creationTime === metadata.lastSignInTime) {
				createUserInDatabase(auth.currentUser.accessToken);
			} else {
				console.log("returning user");
				fetchUser(auth.currentUser.accessToken);
			}
		} catch (error) {
			setGoogleLoading(false);
			console.log("An error occurred while signing in:", error.message);
			setErrorToPrint("An error occurred while signing in. Please try again");
		}
	}
	return (
		<CardWrapper>
			<Stack alignItems="center" spacing={3}>
				<Typography variant="h3" fontWeight="700">
					Sign Up
				</Typography>
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

				{errorToPrint && !loading && !googleLoading && (
					<Typography variant="h6" fontWeight="700" sx={{ color: "primary.main" }}>
						{errorToPrint}
					</Typography>
				)}
				<Stack width="100%" alignItems="center" spacing={1.5}>
					<Button
						disabled={loading || googleLoading}
						fullWidth
						variant="contained"
						sx={{ textTransform: "none", py: 1.5 }}
						onClick={handleCreateAccount}
					>
						{loading && <CircularProgress size="25px" sx={{ color: "background.paper", mr: "15px" }} />}
						<Typography variant="h6" fontWeight="bold" mr={loading ? "40px" : "0px"}>
							Create Account
						</Typography>
					</Button>
					<Typography variant="h6" fontWeight="700">
						OR
					</Typography>
					<Button
						disabled={loading || googleLoading}
						fullWidth
						variant="contained"
						endIcon={<Google sx={{ mr: googleLoading ? "40px" : "0px" }} />}
						sx={{
							textTransform: "none",
							py: 1.5
						}}
						onClick={handleGoogleSignIn}
					>
						{googleLoading && <CircularProgress size="25px" sx={{ color: "background.paper", mr: "15px" }} />}
						<Typography variant="h6" fontWeight="bold">
							Sign in with Google
						</Typography>
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
