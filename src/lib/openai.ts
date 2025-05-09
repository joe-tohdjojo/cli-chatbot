import OpenAI from "openai";
import { config } from "dotenv";

// Load environment variables from .env file
config({ path: ".env" });

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
