import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import { GetVoiceInputSchema } from "../schemas/index.js";
import { transformVoiceOutput } from "../transformers/index.js";
import { createToolHandler, normalizeListItems } from "./utils.js";

export const registerVoiceTools = (server: McpServer, retellClient: Retell) => {
  server.tool(
    "list_voices",
    "Lists all available Retell voices",
    {},
    createToolHandler(async () => {
      const voices = await retellClient.voice.list();
      return normalizeListItems(voices).map(transformVoiceOutput);
    })
  );

  server.tool(
    "get_voice",
    "Gets details of a specific voice",
    GetVoiceInputSchema.shape,
    createToolHandler(async (data) => {
      const voice = await retellClient.voice.retrieve(data.voiceId);
      return transformVoiceOutput(voice);
    })
  );
};
