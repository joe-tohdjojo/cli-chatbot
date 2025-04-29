import chalk from "chalk";

import { emailTool, sendEmail } from "./email";

// const webSearchTool = {
//   search_context_size: "low",
//   type: "web_search_preview",
//   user_location: {
//     type: "approximate",
//     country: "GB",
//     city: "London",
//     region: "London",
//   },
// };

export const tools = [
  // webSearchTool
  emailTool,
];

const TOOLS_MAP = {
  send_email: sendEmail,
};

export function handleFunctionCall(name: string, args: any) {
  switch (name) {
    case "send_email":
      // const { to, subject, body } = args;
      // TOOLS_MAP[name](to, subject, body);

      return "success";
    default:
      console.log(chalk.red.bold("Unknown function call"));
      return "failure";
  }
}
