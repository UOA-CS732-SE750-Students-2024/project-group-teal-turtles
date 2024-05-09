"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import useDataStore from "@/lib/store";

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const pages = [
		{ name: "Dashboard", url: "/dashboard" },
		{ name: "Generate", url: "/generation-options?generateOption=Basic" },
		{ name: "Pantry", url: "/pantry" },
		{ name: "Recipe", url: "/view-meal" }
	];
	const currentUrl = usePathname();
	const router = useRouter();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar
			position={currentUrl !== "/landing" ? "sticky" : "absolute"}
			elevation={currentUrl !== "/landing" ? 1 : 0}
			sx={{
				top: 0,
				justifyContent: "flex-start",
				height: 70,
				backgroundColor: currentUrl !== "/landing" ? "primary.main" : "transparent"
			}}
		>
			<Container sx={{ height: "100%" }}>
				<Toolbar disableGutters sx={{ height: "100%" }}>
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
								fontWeight: "bold",
								color: "inherit",
								textDecoration: "none"
							}}
						>
							Intelligent Eats
						</Typography>
					</Box>

					{currentUrl !== "/landing" ? (
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
								<MenuIcon />
							</IconButton>
							<Menu
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left"
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" }
								}}
							>
								{pages.map((page, idx) => (
									<MenuItem key={idx} onClick={handleCloseNavMenu} sx={{ p: 0 }}>
										<Button
											key={idx}
											onClick={() => router.push(page.url)}
											sx={{ color: "black", px: 2, py: 1, width: "100%", fontWeight: "bold" }}
										>
											{page.name}
										</Button>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : null}

					<Box
						onClick={() => router.push(currentUrl !== "/landing" ? "/dashboard" : "/landing")}
						sx={{
							display: {
								xs: "flex",
								md: "none",
								"&:hover": {
									cursor: "pointer"
								}
							},
							flexGrow: 1,
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
								fontWeight: "bold",
								color: "inherit",
								textDecoration: "none"
							}}
						>
							Intelligent Eats
						</Typography>
					</Box>

					{currentUrl !== "/landing" && (
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, height: "100%", ml: 2 }}>
							{pages.map((page, idx) => (
								<Button
									key={idx}
									onClick={() => router.push(page.url)}
									sx={{
										px: 2,
										mx: 1,
										color: "white",
										display: "block",
										height: "100%",
										alignSelf: "stretch",
										fontWeight: "bold"
									}}
								>
									{page.name}
								</Button>
							))}
						</Box>
					)}

					{currentUrl !== "/landing" ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Profile">
								<IconButton onClick={() => router.push("/edit-profile")} sx={{ p: 0 }}>
									<Image src={"/user.png"} alt={"User"} width={45} height={45} />
								</IconButton>
							</Tooltip>
						</Box>
					) : (
						<Box sx={{ display: "flex", flexDirection: "row", gap: 2, ml: "auto", height: "100%" }}>
							<Button
								onClick={() => router.push("/login")}
								sx={{
									px: 2,
									mx: 1,
									color: "white",
									display: "block",
									height: "100%",
									alignSelf: "stretch",
									fontWeight: "bold"
								}}
							>
								Sign In
							</Button>
							<Button
								onClick={() => router.push("/create-account")}
								sx={{
									px: 2,
									mx: 1,
									color: "white",
									display: "block",
									height: "100%",
									alignSelf: "stretch",
									fontWeight: "bold"
								}}
							>
								Create Account
							</Button>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
