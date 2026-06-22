import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import {
  CreatePhoneCallInputSchema,
  CreateWebCallInputSchema,
  GetCallInputSchema,
  ListCallsInputSchema,
  UpdateCallInputSchema,
  DeleteCallInputSchema,
} from "../schemas/index.js";
import {
  transformPhoneCallInput,
  transformWebCallInput,
  transformCallOutput,
  transformListCallsInput,
  transformUpdateCallInput,
} from "../transformers/index.js";
import { createToolHandler, normalizeListItems } from "./utils.js";

export const registerCallTools = (server: McpServer, retellClient: Retell) => {
  server.tool(
    "create_phone_call",
    "Creates a new phone call",
    CreatePhoneCallInputSchema.shape,
    createToolHandler(async (data) => {
      const createCallDto = transformPhoneCallInput(data);
      const call = await retellClient.call.createPhoneCall(createCallDto);
      return transformCallOutput(call);
    })
  );

  server.tool(
    "create_web_call",
    "Creates a new web call",
    CreateWebCallInputSchema.shape,
    createToolHandler(async (data) => {
      const createCallDto = transformWebCallInput(data);
      const call = await retellClient.call.createWebCall(createCallDto);
      return transformCallOutput(call);
    })
  );

  server.tool(
    "get_call",
    "Gets a call by ID",
    GetCallInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const call = await retellClient.call.retrieve(data.callId);
        if (!call) {
          throw new Error(`Call with ID ${data.callId} not found`);
        }
        return transformCallOutput(call);
      } catch (error: any) {
        console.error(`Error getting call: ${error.message}`);
        throw error;
      }
    })
  );

  server.tool(
    "list_calls",
    "Lists all calls",
    ListCallsInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const listCallsDto = transformListCallsInput(data);
        const calls = await retellClient.call.list(listCallsDto);
        return normalizeListItems(calls).map(transformCallOutput);
      } catch (error: any) {
        console.error(`Error listing calls: ${error.message}`);
        throw error;
      }
    })
  );

  server.tool(
    "update_call",
    "Updates an existing call",
    UpdateCallInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        const callId = data.callId;
        const updateCallDto = transformUpdateCallInput(data);
        const updatedCall = await retellClient.call.update(
          callId,
          updateCallDto
        );
        return transformCallOutput(updatedCall);
      } catch (error: any) {
        console.error(`Error updating call: ${error.message}`);
        throw error;
      }
    })
  );

  server.tool(
    "delete_call",
    "Deletes a call",
    DeleteCallInputSchema.shape,
    createToolHandler(async (data) => {
      try {
        await retellClient.call.delete(data.callId);
        return {
          success: true,
          message: `Call ${data.callId} deleted successfully`,
        };
      } catch (error: any) {
        console.error(`Error deleting call: ${error.message}`);
        throw error;
      }
    })
  );
};
