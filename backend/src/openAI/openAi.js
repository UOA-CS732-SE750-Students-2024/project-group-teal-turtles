import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
	organization: process.env.ORGANIZATION_ID,
	project: process.env.PROJECT_ID
});

async function createAndRun(assistantID, body) {
	const thread = await openai.beta.threads.create();

	const message = await openai.beta.threads.messages.create(thread.id, {
		role: "user",
		content: body
	});

	let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: assistantID
	});

	if (run.status === "completed") {
		const messages = await openai.beta.threads.messages.list(run.thread_id);
		return messages.data[0].content[0].text.value;
	} else {
		console.log(run.status);
	}
}

export default createAndRun;
