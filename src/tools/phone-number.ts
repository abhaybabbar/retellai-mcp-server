import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import {
  CreatePhoneNumberInputSchema,
  GetPhoneNumberInputSchema,
  UpdatePhoneNumberInputSchema,
} from "../schemas/index.js";
import { transformPhoneNumberOutput } from "../transformers/index.js";
import { createToolHandler, createZeroArgToolHandler } from "./utils.js";

export const registerPhoneNumberTools = (
  server: McpServer,
  retellClient: Retell
) => {
  server.registerTool(
    "list_phone_numbers",
    { description: "Lists all Retell phone numbers" },
    createZeroArgToolHandler(async () => {
      const phoneNumbers = await retellClient.phoneNumber.list();
      return phoneNumbers.map(transformPhoneNumberOutput);
    })
  );

  server.registerTool(
    "create_phone_number",
    {
      description: "Creates a new phone number",
      inputSchema: CreatePhoneNumberInputSchema,
    },
    createToolHandler(async (data) => {
      const createPhoneNumberDto = {
        area_code: data.areaCode,
        inbound_agent_id: data.inboundAgentId,
        outbound_agent_id: data.outboundAgentId,
        nickname: data.nickname,
        inbound_webhook_url: data.inboundWebhookUrl,
      };
      const phoneNumber = await retellClient.phoneNumber.create(
        createPhoneNumberDto
      );
      return transformPhoneNumberOutput(phoneNumber);
    })
  );

  server.registerTool(
    "get_phone_number",
    {
      description: "Gets details of a specific phone number",
      inputSchema: GetPhoneNumberInputSchema,
    },
    createToolHandler(async (data) => {
      const phoneNumber = await retellClient.phoneNumber.retrieve(
        data.phoneNumber
      );
      return transformPhoneNumberOutput(phoneNumber);
    })
  );

  server.registerTool(
    "update_phone_number",
    {
      description: "Updates a phone number",
      inputSchema: UpdatePhoneNumberInputSchema,
    },
    createToolHandler(async (data) => {
      const updatePhoneNumberDto = {
        inbound_agent_id: data.inboundAgentId,
        outbound_agent_id: data.outboundAgentId,
        nickname: data.nickname,
        inbound_webhook_url: data.inboundWebhookUrl,
      };
      const phoneNumber = await retellClient.phoneNumber.update(
        data.phoneNumber,
        updatePhoneNumberDto
      );
      return transformPhoneNumberOutput(phoneNumber);
    })
  );

  server.registerTool(
    "delete_phone_number",
    {
      description: "Deletes a phone number",
      inputSchema: GetPhoneNumberInputSchema,
    },
    createToolHandler(async (data) => {
      await retellClient.phoneNumber.delete(data.phoneNumber);
      return {
        success: true,
        message: `Phone number ${data.phoneNumber} deleted successfully`,
      };
    })
  );
};
