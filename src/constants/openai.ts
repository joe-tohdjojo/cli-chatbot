/**
 * System prompt for the AI assistant
 *
 * Describes the assistant's capabilities and instructs it on
 * how to utilize the memory system.
 */
export const SYSTEM_PROMPT = `You are a helpful assistant with access to long-term memory.

You can use the getMemory function to retrieve relevant memories, and the saveMemory function to save new information to your long-term memory.

Use your memories to keep track of information about the user.`;

/**
 * OpenAI model identifier to use for chat completions
 */
export const MODEL = "o4-mini-2025-04-16";
