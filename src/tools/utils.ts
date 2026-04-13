import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export type ToolResponse = CallToolResult;

export function createSuccessResponse(data: any): ToolResponse {
  return {
    content: [
      {
        type: "text" as const,
        text: typeof data === "string" ? data : JSON.stringify(data),
      },
    ],
  };
}

export function createErrorResponse(error: any): ToolResponse {
  const errorMessage = error?.message || String(error);
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${errorMessage}`,
      },
    ],
  };
}

export function createToolHandler<T>(
  handler: (data: T) => Promise<any>
): (data: T) => Promise<ToolResponse> {
  return async (data: T) => {
    try {
      const result = await handler(data);
      return createSuccessResponse(result);
    } catch (error) {
      console.error("Tool execution error:", error);
      return createErrorResponse(error);
    }
  };
}

export function createZeroArgToolHandler(
  handler: () => Promise<any>
): () => Promise<ToolResponse> {
  return async () => {
    try {
      const result = await handler();
      return createSuccessResponse(result);
    } catch (error) {
      console.error("Tool execution error:", error);
      return createErrorResponse(error);
    }
  };
}
