import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PantryGrid from "./PantryGrid";
import useDataStore from "@/lib/store";
import ingredients from "../../ingredients.json";

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
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

	const { userIngredients, setUserIngredients } = useDataStore();

	let ingredientsPantry = ingredients.filter((item) => userIngredients.includes(item.title));

	const handleIngredientsChange = (item) => {
		// Ensure userIngredients is initialized to an empty array if it's null
		const ingredientsArray = userIngredients || [];

		// Check if the item is already in userIngredients
		const isItemInUserIngredients = ingredientsArray.includes(item);

		// Create a new array based on userIngredients
		let newIngredients;

		// If the item is already in userIngredients, remove it
		if (isItemInUserIngredients) {
			newIngredients = ingredientsArray.filter((ingredient) => ingredient !== item);
		} else {
			// If the item is not in userIngredients, add it
			newIngredients = [...ingredientsArray, item];
		}

		// Update the state with the new array of ingredients
		setUserIngredients(newIngredients);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: "background.paper",
				display: "flex",
				height: "100%",
				minHeight: "calc(100vh - 70px)"
			}}
		>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{ borderRight: 1, borderColor: "divider", minWidth: "180px", paddingTop: "100px" }}
			>
				<Tab label="Your Ingredients" {...a11yProps(0)} />
				<Tab label="Carbs" {...a11yProps(1)} />
				<Tab label="Protein" {...a11yProps(2)} />
				<Tab label="Vegetables" {...a11yProps(3)} />
				<Tab label="Fruit" {...a11yProps(4)} />
				<Tab label="Dairy" {...a11yProps(5)} />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Your Ingredients
				</Typography>
				<PantryGrid itemData={ingredientsPantry} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Bread
				</Typography>
				<PantryGrid itemData={ingredientsBread} onClick={handleIngredientsChange} selected={userIngredients} />
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Pasta
				</Typography>
				<PantryGrid itemData={ingredientsPasta} onClick={handleIngredientsChange} selected={userIngredients} />
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Other
				</Typography>
				<PantryGrid itemData={ingredientsCarbsMisc} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Beef
				</Typography>
				<PantryGrid itemData={ingredientsBeef} onClick={handleIngredientsChange} selected={userIngredients} />
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Chicken
				</Typography>
				<PantryGrid itemData={ingredientsChicken} onClick={handleIngredientsChange} selected={userIngredients} />
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Pork
				</Typography>
				<PantryGrid itemData={ingredientsPork} onClick={handleIngredientsChange} selected={userIngredients} />
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Processed
				</Typography>
				<PantryGrid itemData={ingredientsProcessedMeat} onClick={handleIngredientsChange} selected={userIngredients} />
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Other
				</Typography>
				<PantryGrid itemData={ingredientsProteinMisc} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Vegetables
				</Typography>
				<PantryGrid itemData={ingredientsVegetables} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Fruit
				</Typography>
				<PantryGrid itemData={ingredientsFruit} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
					Dairy
				</Typography>
				<PantryGrid itemData={ingredientsDairy} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
		</Box>
	);
}

const ingredientsBread = ingredients.filter((item) => item.categories.includes("Bread"));
const ingredientsPasta = ingredients.filter((item) => item.categories.includes("Pasta"));
const ingredientsCarbsMisc = ingredients.filter((item) => item.categories.includes("CarbsMisc"));
const ingredientsBeef = ingredients.filter((item) => item.categories.includes("Beef"));
const ingredientsChicken = ingredients.filter((item) => item.categories.includes("Chicken"));
const ingredientsPork = ingredients.filter((item) => item.categories.includes("Pork"));
const ingredientsProcessedMeat = ingredients.filter((item) => item.categories.includes("ProcessedMeat"));
const ingredientsProteinMisc = ingredients.filter((item) => item.categories.includes("ProteinMisc"));
const ingredientsVegetables = ingredients.filter((item) => item.categories.includes("Vegetables"));
const ingredientsFruit = ingredients.filter((item) => item.categories.includes("Fruit"));
const ingredientsDairy = ingredients.filter((item) => item.categories.includes("Dairy"));
