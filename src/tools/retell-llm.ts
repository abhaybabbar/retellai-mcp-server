import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import {
  CreateRetellLLMInputSchema,
  GetRetellLLMInputSchema,
  UpdateRetellLLMInputSchema,
} from "../schemas/index.js";
import {
  transformRetellLLMInput,
  transformUpdateRetellLLMInput,
  transformRetellLLMOutput,
} from "../transformers/index.js";
import { createToolHandler, createZeroArgToolHandler } from "./utils.js";

export const registerRetellLLMTools = (
  server: McpServer,
  retellClient: Retell
) => {
  server.registerTool(
    "list_retell_llms",
    { description: "Lists all Retell LLMs" },
    createZeroArgToolHandler(async () => {
      const llms = await retellClient.llm.list();
      return llms.map(transformRetellLLMOutput);
    })
  );

  server.registerTool(
    "create_retell_llm",
    {
      description: "Creates a new Retell LLM",
      inputSchema: CreateRetellLLMInputSchema,
    },
    createToolHandler(async (data) => {
      const createLLMDto = transformRetellLLMInput(data);
      const llm = await retellClient.llm.create(createLLMDto);
      return transformRetellLLMOutput(llm);
    })
  );

  server.registerTool(
    "get_retell_llm",
    {
      description: "Gets a Retell LLM by ID",
      inputSchema: GetRetellLLMInputSchema,
    },
    createToolHandler(async (data) => {
      try {
        const llm = await retellClient.llm.retrieve(data.llmId);
        if (!llm) {
          throw new Error(`Retell LLM with ID ${data.llmId} not found`);
        }
        return transformRetellLLMOutput(llm);
      } catch (error: any) {
        console.error(`Error getting Retell LLM: ${error.message}`);
        throw error;
      }
    })
  );

  server.registerTool(
    "update_retell_llm",
    {
      description: "Updates an existing Retell LLM",
      inputSchema: UpdateRetellLLMInputSchema,
    },
    createToolHandler(async (data) => {
      try {
        const llmId = data.llmId;
        const updateLLMDto = transformUpdateRetellLLMInput(data);
        const updatedLLM = await retellClient.llm.update(llmId, updateLLMDto);
        return transformRetellLLMOutput(updatedLLM);
      } catch (error: any) {
        console.error(`Error updating Retell LLM: ${error.message}`);
        throw error;
      }
    })
  );

  server.registerTool(
    "delete_retell_llm",
    {
      description: "Deletes a Retell LLM",
      inputSchema: GetRetellLLMInputSchema,
    },
    createToolHandler(async (data) => {
      try {
        await retellClient.llm.delete(data.llmId);
        return {
          success: true,
          message: `Retell LLM ${data.llmId} deleted successfully`,
        };
      } catch (error: any) {
        console.error(`Error deleting Retell LLM: ${error.message}`);
        throw error;
      }
    })
  );
};
