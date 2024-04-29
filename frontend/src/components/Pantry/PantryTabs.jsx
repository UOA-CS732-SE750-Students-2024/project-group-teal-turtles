import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: "background.paper",
				display: "flex",
				height: "100%",
				minHeight: "calc(100vh - 120px)"
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
				<PantryGrid itemData={itemData[0]} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<PantryGrid itemData={itemData[1]} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PantryGrid itemData={itemData[2]} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PantryGrid itemData={itemData[3]} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<PantryGrid itemData={itemData[4]} />
			</TabPanel>
			<TabPanel value={value} index={5}>
				<PantryGrid itemData={itemData[5]} />
			</TabPanel>
		</Box>
	);
}

const itemData = [
	// Your ingredients
	[],
	// Carbs
	[
		// Bread
		{
			img: "/images/pantry-icons/carbohydrates/bread/bagel.png",
			title: "Bagel"
		},
		{
			img: "/images/pantry-icons/carbohydrates/bread/baguette.png",
			title: "Baguette"
		},
		{
			img: "/images/pantry-icons/carbohydrates/bread/bun.png",
			title: "Bun"
		},
		{
			img: "/images/pantry-icons/carbohydrates/bread/flatbread.png",
			title: "Flat bread"
		},
		{
			img: "/images/pantry-icons/carbohydrates/bread/sliced.png",
			title: "Sliced bread"
		},
		{
			img: "/images/pantry-icons/carbohydrates/bread/sourdough.png",
			title: "Sourdough"
		},
		{
			img: "/images/pantry-icons/carbohydrates/bread/wrap.png",
			title: "Wrap"
		},
		// Pasta
		{
			img: "/images/pantry-icons/carbohydrates/pasta/farfalle.png",
			title: "Farfalle"
		},
		{
			img: "/images/pantry-icons/carbohydrates/pasta/fusilli.png",
			title: "Fusilli"
		},
		{
			img: "/images/pantry-icons/carbohydrates/pasta/macaroni.png",
			title: "Macaroni"
		},
		{
			img: "/images/pantry-icons/carbohydrates/pasta/penne.png",
			title: "Penne"
		},
		{
			img: "/images/pantry-icons/carbohydrates/pasta/ravioli.png",
			title: "Ravioli"
		},
		{
			img: "/images/pantry-icons/carbohydrates/pasta/spaghetti.png",
			title: "Spaghetti"
		},
		// Misc
		{
			img: "/images/pantry-icons/carbohydrates/cereal.png",
			title: "Cereal"
		},
		{
			img: "/images/pantry-icons/carbohydrates/corn.png",
			title: "Corn"
		},
		{
			img: "/images/pantry-icons/carbohydrates/noodles.png",
			title: "Noodles"
		},
		{
			img: "/images/pantry-icons/carbohydrates/potatoes.png",
			title: "Potatoes"
		},
		{
			img: "/images/pantry-icons/carbohydrates/rice.png",
			title: "Rice"
		}
	],
	// Protein
	[
		{
			img: "/images/pantry-icons/protein/bacon.png",
			title: "Bacon"
		},
		{
			img: "/images/pantry-icons/protein/beefpatty.png",
			title: "Beef patty"
		},
		{
			img: "/images/pantry-icons/protein/beefribs.png",
			title: "Beef ribs"
		},
		{
			img: "/images/pantry-icons/protein/chickenbreast.png",
			title: "Chicken breast"
		},
		{
			img: "/images/pantry-icons/protein/chickendrum.png",
			title: "Chicken drum"
		},
		{
			img: "/images/pantry-icons/protein/chickenwhole.png",
			title: "Chicken whole"
		},
		{
			img: "/images/pantry-icons/protein/chickenwing.png",
			title: "Chicken wing"
		},
		{
			img: "/images/pantry-icons/protein/eggs.png",
			title: "Eggs"
		},
		{
			img: "/images/pantry-icons/protein/fish.png",
			title: "Fish"
		},
		{
			img: "/images/pantry-icons/protein/ham.png",
			title: "Ham"
		},
		{
			img: "/images/pantry-icons/protein/lambchop.png",
			title: "Lamb chop"
		},
		{
			img: "/images/pantry-icons/protein/legham.png",
			title: "Leg ham"
		},
		{
			img: "/images/pantry-icons/protein/pepperoni.png",
			title: "Pepperoni"
		},
		{
			img: "/images/pantry-icons/protein/pork.png",
			title: "Pork"
		},
		{
			img: "/images/pantry-icons/protein/porkchop.png",
			title: "Pork chop"
		},
		{
			img: "/images/pantry-icons/protein/salami.png",
			title: "Salami"
		},
		{
			img: "/images/pantry-icons/protein/sausage.png",
			title: "Sausage"
		},
		{
			img: "/images/pantry-icons/protein/steak.png",
			title: "Steak"
		},
		{
			img: "/images/pantry-icons/protein/tofu.png",
			title: "Tofu"
		}
	],
	// Vegetables
	[
		{
			img: "/images/pantry-icons/vegetables/asparagus.png",
			title: "Asparagus"
		},
		{
			img: "/images/pantry-icons/vegetables/beans.png",
			title: "Beans"
		},
		{
			img: "/images/pantry-icons/vegetables/brocolli.png",
			title: "Brocolli"
		},
		{
			img: "/images/pantry-icons/vegetables/cabbage.png",
			title: "Cabbage"
		},
		{
			img: "/images/pantry-icons/vegetables/capsicum.png",
			title: "Capsicum"
		},
		{
			img: "/images/pantry-icons/vegetables/carrot.png",
			title: "Carrot"
		},
		{
			img: "/images/pantry-icons/vegetables/celery.png",
			title: "Celery"
		},
		{
			img: "/images/pantry-icons/vegetables/chilli.png",
			title: "Chilli"
		},
		{
			img: "/images/pantry-icons/vegetables/corn.png", // do we want corn in vegetables or carbohydrates (probably vegetables? same with potatoes)
			title: "Corn"
		},
		{
			img: "/images/pantry-icons/vegetables/eggplant.png",
			title: "Eggplant"
		},
		{
			img: "/images/pantry-icons/vegetables/garlic.png",
			title: "Garlic"
		},
		{
			img: "/images/pantry-icons/vegetables/ginger.png",
			title: "Ginger"
		},
		{
			img: "/images/pantry-icons/vegetables/lettuce.png",
			title: "Lettuce"
		},
		{
			img: "/images/pantry-icons/vegetables/mushroom.png",
			title: "Mushroom"
		},
		{
			img: "/images/pantry-icons/vegetables/onion.png",
			title: "Onion"
		},
		{
			img: "/images/pantry-icons/vegetables/peas.png",
			title: "Peas"
		},
		{
			img: "/images/pantry-icons/vegetables/potato.png",
			title: "Potato"
		},
		{
			img: "/images/pantry-icons/vegetables/tomato.png",
			title: "Tomato"
		},
		{
			img: "/images/pantry-icons/vegetables/turnip.png",
			title: "Turnip"
		}
	],
	// Fruit
	[
		{
			img: "/images/pantry-icons/fruit/apple.png",
			title: "Apple"
		},
		{
			img: "/images/pantry-icons/fruit/avocado.png",
			title: "Avocado"
		},
		{
			img: "/images/pantry-icons/fruit/banana.png",
			title: "Banana"
		},
		{
			img: "/images/pantry-icons/fruit/blueberry.png",
			title: "Blueberry"
		},
		{
			img: "/images/pantry-icons/fruit/cantaloupe.png",
			title: "Cantaloupe"
		},
		{
			img: "/images/pantry-icons/fruit/cherry.png",
			title: "Cherry"
		},
		{
			img: "/images/pantry-icons/fruit/coconut.png",
			title: "Coconut"
		},
		{
			img: "/images/pantry-icons/fruit/dragonfruit.png",
			title: "Dragon fruit"
		},
		{
			img: "/images/pantry-icons/fruit/durian.png",
			title: "Durian"
		},
		{
			img: "/images/pantry-icons/fruit/grape.png",
			title: "Grapes"
		},
		{
			img: "/images/pantry-icons/fruit/kiwifruit.png",
			title: "Kiwifruit"
		},
		{
			img: "/images/pantry-icons/fruit/lemon.png",
			title: "Lemon"
		},
		{
			img: "/images/pantry-icons/fruit/lime.png",
			title: "Lime"
		},
		{
			img: "/images/pantry-icons/fruit/mango.png",
			title: "Mango"
		},
		{
			img: "/images/pantry-icons/fruit/mangosteen.png",
			title: "Mangosteen"
		},
		{
			img: "/images/pantry-icons/fruit/orange.png",
			title: "Orange"
		},
		{
			img: "/images/pantry-icons/fruit/peach.png",
			title: "Peach"
		},
		{
			img: "/images/pantry-icons/fruit/pear.png",
			title: "Pear"
		},
		{
			img: "/images/pantry-icons/fruit/pineapple.png",
			title: "Pineapple"
		},
		{
			img: "/images/pantry-icons/fruit/strawberry.png",
			title: "Strawberry"
		},
		{
			img: "/images/pantry-icons/fruit/tomato.png",
			title: "Tomato"
		},
		{
			img: "/images/pantry-icons/fruit/watermelon.png",
			title: "Watermelon"
		}
	],
	// Dairy
	[
		{
			img: "/images/pantry-icons/dairy/butter.png",
			title: "Butter"
		},
		{
			img: "/images/pantry-icons/dairy/cheeseblock.png",
			title: "Cheese (Block)"
		},
		{
			img: "/images/pantry-icons/dairy/cheesesliced.png",
			title: "Cheese (Sliced)"
		},
		{
			img: "/images/pantry-icons/dairy/cheesewheel.png",
			title: "Cheese (Wheel)"
		},
		{
			img: "/images/pantry-icons/dairy/icecream.png",
			title: "Ice cream"
		},
		{
			img: "/images/pantry-icons/dairy/milk.png",
			title: "Milk"
		},
		{
			img: "/images/pantry-icons/dairy/yogurt.png",
			title: "Yogurt"
		}
	]
];
