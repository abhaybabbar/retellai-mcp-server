import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import { GetVoiceInputSchema } from "../schemas/index.js";
import { transformVoiceOutput } from "../transformers/index.js";
import { createToolHandler, createZeroArgToolHandler } from "./utils.js";

export const registerVoiceTools = (server: McpServer, retellClient: Retell) => {
  server.registerTool(
    "list_voices",
    { description: "Lists all available Retell voices" },
    createZeroArgToolHandler(async () => {
      const voices = await retellClient.voice.list();
      return voices.map(transformVoiceOutput);
    })
  );

  server.registerTool(
    "get_voice",
    {
      description: "Gets details of a specific voice",
      inputSchema: GetVoiceInputSchema,
    },
    createToolHandler(async (data) => {
      const voice = await retellClient.voice.retrieve(data.voiceId);
      return transformVoiceOutput(voice);
    })
  );
};
