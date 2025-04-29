import chalk from "chalk";

export function sendEmail(to: string, subject: string, body: string) {
  // This is a placeholder function. In a real application, you would use an email sending service.
  console.log(
    chalk.magenta.bold("⚡️ Tool Call:"),
    chalk.white(
      `Sending email to ${to} with subject "${subject}" and body "${body}"`
    )
  );
}

export const emailTool = {
  type: "function",
  name: "send_email",
  description:
    "Send an email to a given recipient with a subject and message. Ask for confirmation before sending.",
  parameters: {
    type: "object",
    properties: {
      to: {
        type: "string",
        description: "The recipient email address.",
      },
      subject: {
        type: "string",
        description: "Email subject line.",
      },
      body: {
        type: "string",
        description: "Body of the email message.",
      },
    },
    required: ["to", "subject", "body"],
    additionalProperties: false,
  },
};
