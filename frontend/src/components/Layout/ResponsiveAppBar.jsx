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
import MenuIcon from "@mui/icons-material/Menu";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Menu, MenuItem } from "@mui/material";
import useDataStore from "@/lib/store";
import { logout } from "@/app/auth-functions";

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const pages = [
		{ name: "Dashboard", url: "/dashboard" },
		{ name: "Generate", url: "/generation-options?generateOption=Basic" },
		{ name: "Pantry", url: "/pantry" }
	];
	const currentUrl = usePathname();
	const router = useRouter();
	const {
		setUserGeneratedMeals,
		setUserDislikedIngredients,
		setUserEmail,
		setUserFavouriteMeals,
		setUserIngredients,
		setUserParameters,
		setAuthorisedUser,
		setMealToRemix,
		setPrompt
	} = useDataStore();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = async () => {
		try {
			await logout();

			setUserGeneratedMeals([]);
			setUserDislikedIngredients([]);
			setUserEmail(null);
			setUserFavouriteMeals([]);
			setUserIngredients([]);
			setUserParameters(null);
			setAuthorisedUser(null);
			setMealToRemix("");
			setPrompt("");

			router.push("/landing");
			console.log("logout successful");
		} catch (error) {
			console.log(error);
		}
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
			<Container maxWidth="xl" sx={{ height: "100%" }}>
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
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none"
							}}
						>
							Intelligent Eats
						</Typography>
					</Box>

					{currentUrl !== "/landing" ? (
						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
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
											sx={{ color: "black", px: 2, py: 1, width: "100%" }}
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
								fontWeight: 700,
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
									sx={{ px: 2, mx: 1, color: "white", display: "block", height: "100%", alignSelf: "stretch" }}
								>
									{page.name}
								</Button>
							))}
						</Box>
					)}

					{currentUrl !== "/landing" ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Username">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar src="/broken-image.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right"
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handleCloseUserMenu} sx={{ p: 0 }}>
									<Button
										onClick={() => router.push("/edit-profile")}
										sx={{ color: "black", px: 2, py: 1, width: "100%" }}
									>
										Profile
									</Button>
								</MenuItem>
								<MenuItem sx={{ p: 0 }}>
									<Button onClick={handleLogout} sx={{ color: "red", px: 2, py: 1 }}>
										Log out
									</Button>
								</MenuItem>
							</Menu>
						</Box>
					) : (
						<Box sx={{ display: "flex", flexDirection: "row", gap: 2, ml: "auto", height: "100%" }}>
							<Button
								onClick={() => router.push("/login")}
								sx={{ px: 2, mx: 1, color: "white", display: "block", height: "100%", alignSelf: "stretch" }}
							>
								Sign In
							</Button>
							<Button
								onClick={() => router.push("/create-account")}
								sx={{ px: 2, mx: 1, color: "white", display: "block", height: "100%", alignSelf: "stretch" }}
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
