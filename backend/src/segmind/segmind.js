import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

async function generateImage(mealName, ingredientsUser, ingredientsNeeded) {
	const data = {
		prompt: `4k, realistic, tasty looking dish, highly detailed, bokeh, cinemascope, moody, gorgeous, film grain, grainy, ${
			mealName ?? ""
		} on a plate, ingredients of dish ${ingredientsUser != null ? ingredientsUser.join(" ") : ""} ${
			ingredientsNeeded != null ? ingredientsNeeded.join(" ") : ""
		},`,
		negative_prompt: "ugly, tiling, people, blurry, blurred, unappealing, background items",
		img_width: 1024,
		img_height: 1024,
		base64: true
	};
	const response = await axios.post(process.env.SEGMIND_URL, data, {
		headers: { "x-api-key": process.env.SEGMIND_API_KEY }
	});
	return response.data.image;
}

export default generateImage;
