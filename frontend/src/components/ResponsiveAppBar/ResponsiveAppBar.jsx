import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { Link } from "@mui/material";

const pages = [
	{ name: "Dashboard", url: "/dashboard" },
	{ name: "Generate", url: "/generation-options" },
	{ name: "Create account", url: "/create-account" }
];
const settings = [
	{ name: "Profile", url: "/profile" },
	{ name: "Pantry", url: "/pantry" },
	{ name: "Logout", url: "/logout" }
];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

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

	return (
		<AppBar position="sticky" sx={{ top: 0, justifyContent: "flex-start" }}>
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
							href="#app-bar-with-responsive-menu"
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
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Link textAlign="center" href={page.url} sx={{ textDecoration: "none", color: "black" }}>
										{page.name}
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none", flexGrow: 1 }, mr: 1 }}>
						<Image src={"/logo.png"} alt={"Logo"} width={50} height={50} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								my: "auto",
								ml: 1,
								fontWeight: 700,
								color: "inherit",
								textDecoration: "none"
							}}
						>
							Intelligent Eats
						</Typography>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								href={page.url}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page.name}
							</Button>
						))}
					</Box>
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
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Link textAlign="center" href={setting.url} sx={{ textDecoration: "none", color: "black" }}>
										{setting.name}
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
