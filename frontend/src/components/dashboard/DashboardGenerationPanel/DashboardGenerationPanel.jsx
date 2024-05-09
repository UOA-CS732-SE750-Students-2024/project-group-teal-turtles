import DashboardGenerationCard from "@/components/dashboard/DashboardGenerationPanel/DashboardGenerationCard";
import { Grid, Paper, Typography, Box } from "@mui/material";
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

	return (
		<Grid container spacing={2} sx={{ mb: "2vh" }}>
			<Grid item xs={6}>
				<DashboardGenerationCard
					header="Basic"
					description="Will use ingredients from your pantry as well as other ingredients to generate a delicious meal"
					onClick={() => handleButtonPress("Basic")}
				/>
			</Grid>
			<Grid item xs={6}>
				<DashboardGenerationCard
					header="Strict"
					description="Will only use the ingredients from your pantry to generate a delicious meal"
					onClick={() => handleButtonPress("Strict")}
				/>
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
