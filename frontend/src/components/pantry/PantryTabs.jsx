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
import { Stack } from "@mui/material";

function TabPanel({ children, value, index }) {
	return <div hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
}

function StyledTypography({ text }) {
	return (
		<Typography variant="h5" fontWeight="bold" sx={{ mt: 3, mb: 3, color: "primary.main" }}>
			{text}
		</Typography>
	);
}

export default function PantryTabs() {
	const [value, setValue] = useState(0);

	const handleChange = (_event, newValue) => {
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

	const tabStyles = { fontWeight: "bold", fontSize: "20px", textTransform: "none" };
	const pantryGridProps = { onClick: handleIngredientsChange, selected: userIngredients };

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
				sx={{ borderRight: 1, borderColor: "divider", minWidth: "230px", paddingTop: "100px" }}
			>
				<Tab sx={tabStyles} label="Your Ingredients" />
				<Tab sx={tabStyles} label="Carbs" />
				<Tab sx={tabStyles} label="Protein" />
				<Tab sx={tabStyles} label="Vegetables" />
				<Tab sx={tabStyles} label="Fruit" />
				<Tab sx={tabStyles} label="Dairy" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Stack spacing={2} sx={{ mt: 3, mb: 3, width: "40vw" }}>
					<Typography variant="h5" fontWeight="bold" sx={{ color: "primary.main" }}>
						Your Ingredients
					</Typography>
					{userIngredients && userIngredients.length > 0 ? (
						<Fab
							onClick={() => setUserIngredients([])}
							sx={{
								width: "150px",
								backgroundColor: "background.paper",
								height: "40px",
								borderRadius: "20px",
								color: "primary.main"
							}}
						>
							<Typography fontWeight="bold" textTransform="none" mr={1}>
								Clear Pantry
							</Typography>
							<Delete />
						</Fab>
					) : null}
				</Stack>

				{userIngredients && userIngredients.length > 0 ? (
					<PantryGrid itemData={ingredientsPantry} {...pantryGridProps} />
				) : (
					<Typography variant="h6" sx={{ mt: 3, mb: 1, color: "secondary.main" }}>
						Add Ingredients to get started
					</Typography>
				)}
			</TabPanel>
			<TabPanel value={value} index={1}>
				<StyledTypography text="Bread" />
				<PantryGrid itemData={ingredientsBread} {...pantryGridProps} />
				<StyledTypography text="Pasta" />
				<PantryGrid itemData={ingredientsPasta} {...pantryGridProps} />
				<StyledTypography text="Other" />
				<PantryGrid itemData={ingredientsCarbsMisc} {...pantryGridProps} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<StyledTypography text="Beef" />
				<PantryGrid itemData={ingredientsBeef} {...pantryGridProps} />
				<StyledTypography text="Chicken" />
				<PantryGrid itemData={ingredientsChicken} {...pantryGridProps} />
				<StyledTypography text="Pork" />
				<PantryGrid itemData={ingredientsPork} {...pantryGridProps} />
				<StyledTypography text="Processed" />
				<PantryGrid itemData={ingredientsProcessedMeat} {...pantryGridProps} />
				<StyledTypography text="Other" />
				<PantryGrid itemData={ingredientsProteinMisc} {...pantryGridProps} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<StyledTypography text="Vegetables" />
				<PantryGrid itemData={ingredientsVegetables} {...pantryGridProps} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<StyledTypography text="Fruit" />
				<PantryGrid itemData={ingredientsFruit} {...pantryGridProps} />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<StyledTypography text="Dairy" />
				<PantryGrid itemData={ingredientsDairy} {...pantryGridProps} />
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
