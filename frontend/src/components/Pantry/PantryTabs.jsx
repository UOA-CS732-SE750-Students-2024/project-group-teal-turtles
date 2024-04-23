"use client";

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";
import PantryGrid from "./PantryGrid";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`
	};
}

export default function PantryTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: "100%" }}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{ borderRight: 1, borderColor: "divider", minWidth: "180px" }}
			>
				<Tab label="Your Ingredients" {...a11yProps(0)} />
				<Tab label="All" {...a11yProps(1)} />
				<Tab label="Carbs" {...a11yProps(2)} />
				<Tab label="Meat" {...a11yProps(3)} />
				<Tab label="Vegetables" {...a11yProps(4)} />
				<Tab label="Fruit" {...a11yProps(5)} />
				<Tab label="Dairy" {...a11yProps(6)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<PantryGrid />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<PantryGrid />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PantryGrid />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PantryGrid />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<PantryGrid />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<PantryGrid />
			</TabPanel>
			<TabPanel value={value} index={6}>
				<PantryGrid />
			</TabPanel>
		</Box>
	);
}
