import axios from "axios";

export function getSegmindMeal(data) {
	return axios.post(process.env.SEGMIND_URL, data, {
		headers: { "x-api-key": process.env.SEGMIND_API_KEY }
	});
}
