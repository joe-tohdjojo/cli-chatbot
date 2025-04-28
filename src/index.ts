import readlineSync from "readline-sync";
import ora from "ora";
import chalk from "chalk";

import { openai } from "./lib/openai";
import { AI_MODEL } from "./constants";

async function submitPrompt(prompt: string) {
  const spinner = ora("Thinking...").start();

  const stream = await openai.responses.create({
    model: AI_MODEL,
    input: [{ role: "user", content: prompt }],
    stream: true,
  });

  spinner.stop();

  return stream;
}

async function main() {
  console.clear();
  while (true) {
    const userPrompt = readlineSync.question(chalk.blue.bold("You: "));

    if (userPrompt.toLowerCase() === "exit") break;

    const stream = await submitPrompt(userPrompt);

    process.stdout.write(chalk.greenBright.bold("AI: "));

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        process.stdout.write(chalk.white(event.delta));
      }
    }
    console.log("\n");
  }
}

main();
