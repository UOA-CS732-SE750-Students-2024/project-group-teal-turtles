"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ResponsiveAppBar() {
	const pages = [
		{ name: "Dashboard", url: "/dashboard" },
		{ name: "Generate", url: "/generation-options?generateOption=Basic" },
		{ name: "Pantry", url: "/pantry" }
	];
	const currentUrl = usePathname();
	const router = useRouter();

	return (
		// <>
		// 	{showContent && (
		<AppBar position="sticky" sx={{ top: 0, justifyContent: "flex-start", height: 70 }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						onClick={() => router.push(currentUrl !== "/landing" ? "/dashboard" : "/landing")}
						sx={{
							display: {
								xs: "none",
								md: "flex",
								"&:hover": {
									cursor: "pointer"
								}
							},
							mr: 1,
							alignItems: "center"
						}}
					>
						<Image
							src={"/logo.png"}
							alt={"Logo"}
							width={50}
							height={50}
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							sx={{
								my: "auto",
								ml: 1,
								mr: 2,
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none"
							}}
						>
							Intelligent Eats
						</Typography>
					</Box>

					{currentUrl !== "/landing" && (
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page, idx) => (
								<Button
									key={idx}
									onClick={() => router.push(page.url)}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									{page.name}
								</Button>
							))}
						</Box>
					)}

					{currentUrl !== "/landing" ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open Profile">
								<IconButton onClick={() => router.push("/profile")} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
						</Box>
					) : (
						<Box sx={{ display: "flex", flexDirection: "row", gap: 2, ml: "auto" }}>
							<Button onClick={() => router.push("/login")} sx={{ my: 2, color: "white", display: "block" }}>
								Sign In
							</Button>
							<Button onClick={() => router.push("/create-account")} sx={{ my: 2, color: "white", display: "block" }}>
								Create Account
							</Button>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
		// 	)}
		// </>
	);
}
export default ResponsiveAppBar;
