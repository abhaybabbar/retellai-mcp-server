import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import {
  CreateAgentInputSchema,
  GetAgentInputSchema,
  UpdateAgentInputSchema,
} from "../schemas/index.js";
import {
  transformAgentInput,
  transformAgentOutput,
  transformUpdateAgentInput,
} from "../transformers/index.js";
import { createToolHandler, normalizeListItems } from "./utils.js";

export const registerAgentTools = (server: McpServer, retellClient: Retell) => {
  server.tool(
    "list_agents",
    "Lists all Retell agents",
    {},
    createToolHandler(async () => {
      const agents = await retellClient.agent.list();
      return normalizeListItems(agents).map(transformAgentOutput);
    })
  );

  server.tool(
    "create_agent",
    "Creates a new Retell agent",
    CreateAgentInputSchema.shape,
    createToolHandler(async (data) => {
      const createAgentDto = transformAgentInput(data);
      const agent = await retellClient.agent.create(createAgentDto);
      return transformAgentOutput(agent);
    })
  );

  server.tool(
    "get_agent",
    "Gets a Retell agent by ID",
    GetAgentInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const agent = await retellClient.agent.retrieve(data.agentId);
        if (!agent) {
          throw new Error(`Agent with ID ${data.agentId} not found`);
        }
        return transformAgentOutput(agent);
      } catch (error: any) {
        console.error(`Error getting agent: ${error.message}`);
        throw error;
      }
    })
  );

  server.tool(
    "update_agent",
    "Updates an existing Retell agent",
    UpdateAgentInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const agentId = data.agentId;

        // Transform the update data
        const updateAgentDto = transformUpdateAgentInput(data);

        // Update the agent
        const updatedAgent = await retellClient.agent.update(
          agentId,
          updateAgentDto
        );

        return transformAgentOutput(updatedAgent);
      } catch (error: any) {
        console.error(`Error updating agent: ${error.message}`);
        throw error;
      }
    })
  );

  server.tool(
    "delete_agent",
    "Deletes a Retell agent",
    GetAgentInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        await retellClient.agent.delete(data.agentId);
        return {
          success: true,
          message: `Agent ${data.agentId} deleted successfully`,
        };
      } catch (error: any) {
        console.error(`Error deleting agent: ${error.message}`);
        throw error;
      }
    })
  );

  server.tool(
    "get_agent_versions",
    "Gets all versions of a Retell agent",
    GetAgentInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const versions = await retellClient.agent.getVersions(data.agentId);
        return versions;
      } catch (error: any) {
        console.error(`Error getting agent versions: ${error.message}`);
        throw error;
      }
    })
  );
};
