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

	const run = openai.beta.threads.runs
		.stream(thread.id, {
			assistant_id: assistantID
		})
		.on("textCreated", (text) => process.stdout.write("\nassistant > "))
		.on("textDelta", (textDelta, snapshot) => {
			process.stdout.write(textDelta.value);
			//can do something with textDelta from here
		});
}

export default createAndRun;
