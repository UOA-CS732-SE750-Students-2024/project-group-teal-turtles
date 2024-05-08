"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import CardWrapper from "@/components/CardWrapper/CardWrapper";
import { handleGoogleLogin, login } from "@/app/auth-functions";
import { auth } from "@/app/firebase-config";
import axios from "axios";
import useDataStore from "@/lib/store";
import { useRouter } from "next/navigation";

function Login() {
	const [visible, setVisible] = useState(false);
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
		userParameters,
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
			console.log(userParameters);
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
			router.push("/onboarding");
			return response.data;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	}

	async function handleSignIn() {
		try {
			setLoading(true);
			await login(email, password);
			setAuthorisedUser(auth.currentUser);

			setUserEmail(auth.currentUser.email);
			fetchUser(auth.currentUser.accessToken);
		} catch (error) {
			setLoading(false);
			if (error.code === "auth/invalid-credential") {
				console.log("Invalid credentials. Please check your email and password.");
				setErrorToPrint("Invalid credentials. Please check your email and password");
			} else if (error.code === "auth/too-many-requests") {
				console.log(
					"Access to this account has been temporarily disabled due to many failed login attempts. Please try again later."
				);
				setErrorToPrint(
					"Access to this account has been temporarily disabled due to many failed login attempts. Please try again later"
				);
			} else {
				console.log("An error occurred while signing in:", error.message);
				setErrorToPrint("An error has occurred while signing in. Please try again");
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

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && email && password) {
			handleSignIn();
		}
	};

	return (
		<CardWrapper>
			<Stack alignItems="center" spacing={3}>
				<Typography variant="h3" fontWeight="bold" sx={{ color: "primary.dark" }}>
					Login
				</Typography>
				<Typography variant="h5">Sign in to access saved recipes and information.</Typography>
				<TextField
					fullWidth
					label="Email Address"
					value={email}
					onKeyDown={handleKeyPress}
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<TextField
					fullWidth
					label="Password (6+ Characters)"
					type={visible ? "text" : "password"}
					value={password}
					onKeyDown={handleKeyPress}
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
				{errorToPrint && !loading && !googleLoading && (
					<Typography fontWeight="bold" sx={{ color: "primary.main" }}>
						{errorToPrint}
					</Typography>
				)}
				<Stack width="100%" alignItems="center" spacing={1.5}>
					<Button
						disabled={loading || googleLoading}
						fullWidth
						variant="contained"
						sx={{
							textTransform: "none",
							py: 1.5,
							borderRadius: "30px"
						}}
						onClick={handleSignIn}
					>
						{loading && <CircularProgress size="25px" sx={{ color: "background.paper", mr: "15px" }} />}
						<Typography variant="h6" fontWeight="bold" mr={loading ? "40px" : "0px"}>
							Sign in
						</Typography>
					</Button>
					<Typography variant="h6" fontWeight="bold">
						OR
					</Typography>
					<Button
						disabled={loading || googleLoading}
						fullWidth
						variant="contained"
						endIcon={<Google sx={{ mr: googleLoading ? "40px" : "0px" }} />}
						sx={{
							textTransform: "none",
							py: 1.5,
							borderRadius: "30px"
						}}
						onClick={handleGoogleSignIn}
					>
						{googleLoading && <CircularProgress size="25px" sx={{ color: "background.paper", mr: "15px" }} />}
						<Typography variant="h6" fontWeight="bold">
							Sign in with Google
						</Typography>
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
