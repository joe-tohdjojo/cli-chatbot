import chalk from "chalk";
import ora from "ora";
import readlineSync from "readline-sync";

import { AI_MODEL } from "./constants";
import { openai } from "./lib";
import { handleFunctionCall, tools } from "./agent-tools";
import { ResponseInput } from "openai/src/resources/responses/responses.js";

async function submitPrompt(prompt: string, conversationHistory) {
  const spinner = ora("Thinking...").start();

  conversationHistory.push({ role: "user", content: prompt });

  const response = await openai.responses.create({
    input: conversationHistory,
    model: AI_MODEL,
    tools,
  });

  for (const output of response.output) {
    switch (output.type) {
      // case "message":
      //   return response.output_text;
      case "function_call":
        spinner.text = `Calling function ${output.name}...`;
        conversationHistory.push(output);
        const result = handleFunctionCall(
          output.name,
          JSON.parse(output.arguments)
        );
        conversationHistory.push({
          type: "function_call_output",
          call_id: output.call_id,
          output: result,
        });
        break;
    }
  }

  const finalResponse = await openai.responses.create({
    input: conversationHistory,
    model: AI_MODEL,
    stream: true,
    tools,
  });

  spinner.stop();

  return finalResponse;
}

async function main() {
  console.clear();
  const conversationHistory: ResponseInput = [];

  while (true) {
    const userPrompt = readlineSync.question(chalk.blue.bold("You: "));

    if (userPrompt.toLowerCase() === "exit") break;

    const stream = await submitPrompt(userPrompt, conversationHistory);

    process.stdout.write(chalk.greenBright.bold("AI: "));

    for await (const event of stream) {
      switch (event.type) {
        case "response.output_text.delta":
          process.stdout.write(chalk.white(event.delta));
          break;
      }
    }
    console.log("\n");
  }
}

main();
