import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PantryGrid from "./PantryGrid";
import useDataStore from "@/lib/store";
import ingredients from "../../ingredients.json";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import { Delete } from "@mui/icons-material";

function TabPanel({ children, value, index, ...other }) {
	return (
		<div hidden={value !== index} {...other}>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

function StyledTypography({ text }) {
	return (
		<Typography variant="h5" fontWeight="bold" sx={{ mt: 3, mb: 3, color: "primary.dark" }}>
			{text}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired
};

export default function PantryTabs() {
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const { userIngredients, setUserIngredients } = useDataStore();

	let ingredientsPantry = ingredients.filter((item) => userIngredients.includes(item.title));

	const handleIngredientsChange = (item) => {
		const ingredientsArray = userIngredients || [];
		const isItemInUserIngredients = ingredientsArray.includes(item);
		let newIngredients;
		if (isItemInUserIngredients) {
			newIngredients = ingredientsArray.filter((ingredient) => ingredient !== item);
		} else {
			newIngredients = [...ingredientsArray, item];
		}
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
				sx={{ borderRight: 1, borderColor: "divider", minWidth: "180px", paddingTop: "100px" }}
			>
				<Tab label="Your Ingredients" />
				<Tab label="Carbs" />
				<Tab label="Protein" />
				<Tab label="Vegetables" />
				<Tab label="Fruit" />
				<Tab label="Dairy" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, width: "40vw" }}>
					<Typography variant="h6">Your Ingredients</Typography>
					{userIngredients && userIngredients.length > 0 ? (
						<Fab onClick={() => setUserIngredients([])} sx={{}}>
							<Delete />
						</Fab>
					) : null}
				</Box>

				{userIngredients && userIngredients.length > 0 ? (
					<PantryGrid itemData={ingredientsPantry} onClick={handleIngredientsChange} selected={userIngredients} />
				) : (
					<Typography variant="h6" sx={{ mt: 3, mb: 1, color: "secondary.main" }}>
						Add Ingredients to get started
					</Typography>
				)}
			</TabPanel>
			<TabPanel value={value} index={1}>
				<StyledTypography text="Bread" />
				<PantryGrid itemData={ingredientsBread} onClick={handleIngredientsChange} selected={userIngredients} />
				<StyledTypography text="Pasta" />
				<PantryGrid itemData={ingredientsPasta} onClick={handleIngredientsChange} selected={userIngredients} />
				<StyledTypography text="Other" />
				<PantryGrid itemData={ingredientsCarbsMisc} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<StyledTypography text="Beef" />
				<PantryGrid itemData={ingredientsBeef} onClick={handleIngredientsChange} selected={userIngredients} />
				<StyledTypography text="Chicken" />
				<PantryGrid itemData={ingredientsChicken} onClick={handleIngredientsChange} selected={userIngredients} />
				<StyledTypography text="Pork" />
				<PantryGrid itemData={ingredientsPork} onClick={handleIngredientsChange} selected={userIngredients} />
				<StyledTypography text="Processed" />
				<PantryGrid itemData={ingredientsProcessedMeat} onClick={handleIngredientsChange} selected={userIngredients} />
				<StyledTypography text="Other" />
				<PantryGrid itemData={ingredientsProteinMisc} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<StyledTypography text="Vegetables" />
				<PantryGrid itemData={ingredientsVegetables} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<StyledTypography text="Fruit" />
				<PantryGrid itemData={ingredientsFruit} onClick={handleIngredientsChange} selected={userIngredients} />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<StyledTypography text="Dairy" />
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
