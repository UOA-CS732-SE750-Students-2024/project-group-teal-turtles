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

	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		const delayToShowContent = setTimeout(() => {
			setShowContent(true);
		}, 50);

		return () => clearTimeout(delayToShowContent);
	}, []);

	const isNotLanding = currentUrl !== "/landing";

	return (
		<>
			{showContent && (
				<AppBar
					position={isNotLanding ? "sticky" : "absolute"}
					elevation={isNotLanding ? 1 : 0}
					sx={{
						top: 0,
						justifyContent: "flex-start",
						height: 70,
						backgroundColor: isNotLanding ? "primary.main" : "transparent"
					}}
				>
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
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
									href="/landing"
									alignSelf="center"
									sx={{
										fontWeight: 900,
										ml: 1,
										color: "background.paper"
									}}
								>
									Intelligent Eats
								</Typography>
							</Box>
							{isNotLanding ? (
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
											<MenuItem key={idx} onClick={handleCloseNavMenu}>
												<Link textAlign="center" href={page.url} sx={{ textDecoration: "none", color: "black" }}>
													{page.name}
												</Link>
											</MenuItem>
										))}
									</Menu>
								</Box>
							) : null}
							<Box sx={{ display: { xs: "flex", md: "none", flexGrow: 1 }, mr: 1 }}>
								<Image src={"/logo.png"} alt={"Logo"} width={50} height={50} />
								<Typography
									variant="h6"
									noWrap
									component="a"
									href="/landing"
									sx={{
										my: "auto",
										ml: 1,
										fontWeight: 700,
										textDecoration: "none"
									}}
								>
									Intelligent Eats
								</Typography>
							</Box>
							{isNotLanding ? (
								<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
									{pages.map((page, idx) => (
										<Button
											key={idx}
											onClick={handleCloseNavMenu}
											href={page.url}
											sx={{ display: "flex", color: "background.paper" }}
										>
											{page.name}
										</Button>
									))}
								</Box>
							) : null}

							{isNotLanding ? (
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
										{settings.map((setting, idx) => (
											<MenuItem key={idx} onClick={handleCloseUserMenu}>
												<Link
													textAlign="center"
													href={setting.url}
													sx={{ textDecoration: "none", color: "background.paper" }}
												>
													{setting.name}
												</Link>
											</MenuItem>
										))}
									</Menu>
								</Box>
							) : (
								<Box sx={{ display: "flex", flexDirection: "row", gap: 2, ml: "auto" }}>
									<Button href="/login" sx={{ display: "flex", color: "background.paper", alignItems: "center" }}>
										Sign In
									</Button>
									<Button
										href="/create-account"
										sx={{ display: "flex", color: "background.paper", alignItems: "center" }}
									>
										Create Account
									</Button>
								</Box>
							)}
						</Toolbar>
					</Container>
				</AppBar>
			)}
		</>
	);
}
export default ResponsiveAppBar;
