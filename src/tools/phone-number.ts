import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import Retell from "retell-sdk";

import {
  CreatePhoneNumberInputSchema,
  GetPhoneNumberInputSchema,
  UpdatePhoneNumberInputSchema,
} from "../schemas/index.js";
import { transformPhoneNumberOutput } from "../transformers/index.js";
import { createToolHandler, normalizeListItems } from "./utils.js";

export const registerPhoneNumberTools = (
  server: McpServer,
  retellClient: Retell
) => {
  server.tool(
    "list_phone_numbers",
    "Lists all Retell phone numbers",
    {},
    createToolHandler(async () => {
      const phoneNumbers = await retellClient.phoneNumber.list();
      return normalizeListItems(phoneNumbers).map(transformPhoneNumberOutput);
    })
  );

  server.tool(
    "create_phone_number",
    "Creates a new phone number",
    CreatePhoneNumberInputSchema.shape,
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

  server.tool(
    "get_phone_number",
    "Gets details of a specific phone number",
    GetPhoneNumberInputSchema.shape,
    createToolHandler(async (data) => {
      const phoneNumber = await retellClient.phoneNumber.retrieve(
        data.phoneNumber
      );
      return transformPhoneNumberOutput(phoneNumber);
    })
  );

  server.tool(
    "update_phone_number",
    "Updates a phone number",
    UpdatePhoneNumberInputSchema.shape,
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

  server.tool(
    "delete_phone_number",
    "Deletes a phone number",
    GetPhoneNumberInputSchema.shape,
    createToolHandler(async (data) => {
      await retellClient.phoneNumber.delete(data.phoneNumber);
      return {
        success: true,
        message: `Phone number ${data.phoneNumber} deleted successfully`,
      };
    })
  );
};
