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
import { createToolHandler, createZeroArgToolHandler } from "./utils.js";

export const registerAgentTools = (server: McpServer, retellClient: Retell) => {
  server.registerTool(
    "list_agents",
    { description: "Lists all Retell agents" },
    createZeroArgToolHandler(async () => {
      const agents = await retellClient.agent.list();
      return agents.map(transformAgentOutput);
    })
  );

  server.registerTool(
    "create_agent",
    {
      description: "Creates a new Retell agent",
      inputSchema: CreateAgentInputSchema,
    },
    createToolHandler(async (data) => {
      const createAgentDto = transformAgentInput(data);
      const agent = await retellClient.agent.create(createAgentDto);
      return transformAgentOutput(agent);
    })
  );

  server.registerTool(
    "get_agent",
    {
      description: "Gets a Retell agent by ID",
      inputSchema: GetAgentInputSchema,
    },
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

  server.registerTool(
    "update_agent",
    {
      description: "Updates an existing Retell agent",
      inputSchema: UpdateAgentInputSchema,
    },
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

  server.registerTool(
    "delete_agent",
    {
      description: "Deletes a Retell agent",
      inputSchema: GetAgentInputSchema,
    },
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

  server.registerTool(
    "get_agent_versions",
    {
      description: "Gets all versions of a Retell agent",
      inputSchema: GetAgentInputSchema,
    },
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
