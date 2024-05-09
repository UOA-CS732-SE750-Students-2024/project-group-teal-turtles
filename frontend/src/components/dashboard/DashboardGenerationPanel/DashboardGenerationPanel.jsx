import DashboardGenerationCard from "@/components/dashboard/DashboardGenerationPanel/DashboardGenerationCard";
import useDataStore from "@/lib/store";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

function DashboardGenerationPanel() {
	const handleButtonPress = (header) => {
		switch (header) {
			case "Basic":
				router.push("/generation-options?generateOption=Basic");
				break;
			case "Strict":
				router.push("/generation-options?generateOption=Strict");
				break;
			case "Remix":
				router.push("/generation-options?generateOption=Remix");
				break;
			case "Prompt":
				router.push("/generation-options?generateOption=Prompt");
				break;
			default:
				// Default redirection
				router.push("/dashboard");
				break;
		}
	};
	const router = useRouter();
	const { userIngredients } = useDataStore();

	return (
		<Grid container spacing={2} sx={{ mb: "2vh" }}>
			<Grid item xs={6}>
				<DashboardGenerationCard
					header="Basic"
					description="Will use ingredients in your pantry as well as other ingredients to generate a delicious meal"
					onClick={() => handleButtonPress("Basic")}
				/>
			</Grid>
			<Grid item xs={6}>
				{userIngredients && userIngredients.length > 0 ? (
					<DashboardGenerationCard
						header="Strict"
						description="Will use only the ingredients in your pantry to generate a delicious meal"
						onClick={() => handleButtonPress("Strict")}
					/>
				) : (
					<Box sx={{ opacity: 0.5 }}>
						<DashboardGenerationCard
							header="Strict"
							description="Add some items to your pantry to use Strict generation"
							onClick={() => {}}
						/>
					</Box>
				)}
			</Grid>
			<Grid item xs={6}>
				<DashboardGenerationCard
					header="Remix"
					description="Input a favourite meal and let us surprise you with a creative twist using your ingredients"
					onClick={() => handleButtonPress("Remix")}
				/>
			</Grid>
			<Grid item xs={6}>
				<DashboardGenerationCard
					header="Prompt"
					description="Pass a prompt that the intelligent engine will use to design a delectable meal."
					onClick={() => handleButtonPress("Prompt")}
				/>
			</Grid>
		</Grid>
	);
}

export default DashboardGenerationPanel;
