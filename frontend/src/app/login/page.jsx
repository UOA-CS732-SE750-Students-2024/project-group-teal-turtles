"use client";

import { Google } from "@mui/icons-material";
import { Stack, Typography, Card, Button, TextField, IconButton, Link } from "@mui/material";
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
	const {
		setUserFavouriteMeals,
		setUserGeneratedMeals,
		setUserIngredients,
		setUserDislikedIngredients,
		setUserParameters,
		userParameters,
		setUserEmail,
		setAuthToken
	} = useDataStore();
	const router = useRouter();
	async function fetchUser(userAuthToken) {
		try {
			const response = await axios.get("https://intelligent-eats.ts.r.appspot.com/api/users", {
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
				"https://intelligent-eats.ts.r.appspot.com/api/users",
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
			router.push("/dashboard");
			return response.data;
		} catch (error) {
			console.error("Error creating user:", error);
			throw error;
		}
	}

	async function handleSignIn() {
		try {
			await login(email, password);
			setAuthToken(auth.currentUser.accessToken);
			setUserEmail(auth.currentUser.email);
			console.log(auth.currentUser.accessToken);
			fetchUser(auth.currentUser.accessToken);
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

	async function handleGoogleSignIn() {
		try {
			await handleGoogleLogin();
			setAuthToken(auth.currentUser.accessToken);
			setUserEmail(auth.currentUser.email);
			console.log(auth.currentUser);
			const metadata = auth.currentUser.metadata;
			if (metadata.creationTime === metadata.lastSignInTime) {
				createUserInDatabase(auth.currentUser.accessToken);
			} else {
				console.log("returning user");
				fetchUser(auth.currentUser.accessToken);
			}
		} catch (error) {
			console.log("An error occurred while signing in:", error.message);
		}
	}
	return (
		<CardWrapper>
			<Stack alignItems="center" spacing={3}>
				<Typography variant="h3" fontWeight="700">
					Login
				</Typography>
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
						<Typography variant="h6" fontWeight="bold">
							Sign in
						</Typography>
					</Button>
					<Typography variant="h6" fontWeight="700">
						OR
					</Typography>
					<Button
						fullWidth
						variant="contained"
						endIcon={<Google />}
						sx={{ textTransform: "none", py: 1.5 }}
						onClick={handleGoogleSignIn}
					>
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
