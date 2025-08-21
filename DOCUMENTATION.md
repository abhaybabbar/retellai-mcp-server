# RetellAI MCP Server - Complete Documentation

## Overview

The RetellAI MCP Server is a Model Context Protocol (MCP) implementation that provides AI assistants with comprehensive access to RetellAI's voice services. This server enables AI models to create and manage voice agents, handle phone calls, manage phone numbers, and configure voice settings programmatically.

## Core Concepts

### RetellAI Services
- **Voice Agents**: AI-powered conversational agents that can make and receive phone calls
- **Phone Calls**: Outbound and inbound voice calls with real-time conversation capabilities
- **Phone Numbers**: Provisioned phone numbers for making and receiving calls
- **Voices**: Text-to-speech voice options for agents
- **Retell LLMs**: Large Language Model configurations that power agent conversations

### Call Types
- **Phone Calls**: Traditional phone calls using phone numbers
- **Web Calls**: Browser-based calls using web interfaces

## Available Tools

### 1. Call Management Tools

#### `create_phone_call`
Creates a new outbound or inbound phone call.

**Required Parameters:**
- `fromNumber` (string): The phone number to call from
- `toNumber` (string): The phone number to call to

**Optional Parameters:**
- `overrideAgentId` (string): Override the default agent for this specific call
- `overrideAgentVersion` (number): Override the agent version for this call
- `direction` (enum): "inbound" or "outbound" (default: "outbound")
- `metadata` (object): Custom metadata as key-value pairs
- `retellLlmDynamicVariables` (object): Dynamic variables to pass to the LLM
- `optOutSensitiveDataStorage` (boolean): Opt out of sensitive data storage
- `optInSignedUrl` (boolean): Opt in for signed URLs

**Example Usage:**
```json
{
  "fromNumber": "+1234567890",
  "toNumber": "+0987654321",
  "direction": "outbound",
  "metadata": {"purpose": "customer_service"},
  "retellLlmDynamicVariables": {"customer_name": "John Doe"}
}
```

#### `create_web_call`
Creates a new web-based call.

**Required Parameters:**
- `agentId` (string): The ID of the agent to use for the call

**Optional Parameters:**
- `metadata` (object): Custom metadata as key-value pairs
- `retellLlmDynamicVariables` (object): Dynamic variables to pass to the LLM
- `optOutSensitiveDataStorage` (boolean): Opt out of sensitive data storage
- `optInSignedUrl` (boolean): Opt in for signed URLs

**Example Usage:**
```json
{
  "agentId": "agent_12345",
  "metadata": {"session_id": "web_session_001"},
  "retellLlmDynamicVariables": {"user_preference": "formal"}
}
```

#### `get_call`
Retrieves details of a specific call by ID.

**Required Parameters:**
- `callId` (string): The ID of the call to retrieve

**Example Usage:**
```json
{
  "callId": "call_67890"
}
```

#### `list_calls`
Lists all calls with optional filtering.

**Optional Parameters:**
- `agentId` (string): Filter calls by agent ID
- `startTimestamp` (number): Filter calls after this timestamp
- `endTimestamp` (number): Filter calls before this timestamp
- `limit` (number): Maximum number of calls to return
- `offset` (number): Number of calls to skip

**Example Usage:**
```json
{
  "agentId": "agent_12345",
  "limit": 10,
  "startTimestamp": 1640995200000
}
```

#### `update_call`
Updates an existing call's metadata or dynamic variables.

**Required Parameters:**
- `callId` (string): The ID of the call to update

**Optional Parameters:**
- `metadata` (object): New metadata to set
- `dynamicVariables` (object): New dynamic variables to set

**Example Usage:**
```json
{
  "callId": "call_67890",
  "metadata": {"status": "escalated"},
  "dynamicVariables": {"priority": "high"}
}
```

#### `delete_call`
Deletes a specific call.

**Required Parameters:**
- `callId` (string): The ID of the call to delete

**Example Usage:**
```json
{
  "callId": "call_67890"
}
```

### 2. Agent Management Tools

#### `list_agents`
Lists all available Retell agents.

**Parameters:** None

**Example Usage:**
```json
{}
```

#### `create_agent`
Creates a new Retell agent with specified configuration.

**Required Parameters:**
- `response_engine` (object):
  - `type` (string): Must be "retell-llm"
  - `llm_id` (string): ID of the Retell LLM Response Engine
- `voice_id` (string): ID of the voice to use

**Optional Parameters:**
- `agent_name` (string): Name of the agent
- `voice_model` (enum): Voice model type
  - Options: "eleven_turbo_v2", "eleven_flash_v2", "eleven_turbo_v2_5", "eleven_flash_v2_5", "eleven_multilingual_v2", "Play3.0-mini", "PlayDialog"
- `language` (enum): Language code
  - Options: "en-US", "en-IN", "en-GB", "en-AU", "en-NZ", "de-DE", "es-ES", "es-419", "hi-IN", "fr-FR", "fr-CA", "ja-JP", "pt-PT", "pt-BR", "zh-CN", "ru-RU", "it-IT", "ko-KR"
- `response_engine.version` (number): Version of the response engine

**Example Usage:**
```json
{
  "response_engine": {
    "type": "retell-llm",
    "llm_id": "llm_12345"
  },
  "voice_id": "voice_67890",
  "agent_name": "Customer Service Agent",
  "voice_model": "eleven_turbo_v2",
  "language": "en-US"
}
```

#### `get_agent`
Retrieves details of a specific agent by ID.

**Required Parameters:**
- `agentId` (string): The ID of the agent to retrieve

**Example Usage:**
```json
{
  "agentId": "agent_12345"
}
```

#### `update_agent`
Updates an existing agent's configuration.

**Required Parameters:**
- `agentId` (string): The ID of the agent to update

**Optional Parameters:**
- `response_engine` (object): Updated response engine configuration
- `voice_id` (string): New voice ID
- `agent_name` (string): New agent name
- `voice_model` (string): New voice model
- `fallback_voice_ids` (array): Array of fallback voice IDs
- `voice_temperature` (number): Voice temperature setting
- `voice_speed` (number): Voice speed setting
- `volume` (number): Volume setting
- `responsiveness` (number): Responsiveness setting
- `interruption_sensitivity` (number): Interruption sensitivity
- `enable_backchannel` (boolean): Enable backchannel responses
- `backchannel_frequency` (number): Backchannel frequency
- `backchannel_words` (array): Array of backchannel words
- `reminder_trigger_ms` (number): Reminder trigger in milliseconds
- `reminder_max_count` (number): Maximum reminder count
- `ambient_sound` (string): Ambient sound setting
- `ambient_sound_volume` (number): Ambient sound volume
- `language` (string): Language setting
- `webhook_url` (string): Webhook URL
- `boosted_keywords` (array): Array of boosted keywords
- `enable_transcription_formatting` (boolean): Enable transcription formatting
- `opt_out_sensitive_data_storage` (boolean): Opt out of sensitive data storage
- `opt_in_signed_url` (boolean): Opt in for signed URLs
- `pronunciation_dictionary` (array): Array of pronunciation dictionary entries
- `normalize_for_speech` (boolean): Normalize for speech
- `end_call_after_silence_ms` (number): End call after silence duration
- `max_call_duration_ms` (number): Maximum call duration
- `enable_voicemail_detection` (boolean): Enable voicemail detection
- `voicemail_message` (string): Voicemail message
- `voicemail_detection_timeout_ms` (number): Voicemail detection timeout
- `post_call_analysis_data` (array): Post-call analysis data configuration
- `post_call_analysis_model` (enum): Post-call analysis model ("gpt-4o-mini" or "gpt-4o")
- `begin_message_delay_ms` (number): Begin message delay
- `ring_duration_ms` (number): Ring duration
- `stt_mode` (enum): Speech-to-text mode ("fast" or "accurate")

**Example Usage:**
```json
{
  "agentId": "agent_12345",
  "agent_name": "Updated Customer Service Agent",
  "voice_temperature": 0.7,
  "responsiveness": 0.8,
  "language": "en-US"
}
```

#### `delete_agent`
Deletes a specific agent.

**Required Parameters:**
- `agentId` (string): The ID of the agent to delete

**Example Usage:**
```json
{
  "agentId": "agent_12345"
}
```

#### `get_agent_versions`
Retrieves all versions of a specific agent.

**Required Parameters:**
- `agentId` (string): The ID of the agent

**Example Usage:**
```json
{
  "agentId": "agent_12345"
}
```

### 3. Phone Number Management Tools

#### `list_phone_numbers`
Lists all available Retell phone numbers.

**Parameters:** None

**Example Usage:**
```json
{}
```

#### `create_phone_number`
Creates a new phone number.

**Required Parameters:**
- `areaCode` (number): Area code of the number to obtain

**Optional Parameters:**
- `inboundAgentId` (string): Agent ID for inbound calls
- `outboundAgentId` (string): Agent ID for outbound calls
- `nickname` (string): Nickname for the phone number
- `inboundWebhookUrl` (string): Webhook URL for inbound calls

**Example Usage:**
```json
{
  "areaCode": 415,
  "inboundAgentId": "agent_12345",
  "outboundAgentId": "agent_67890",
  "nickname": "Main Business Line"
}
```

#### `get_phone_number`
Retrieves details of a specific phone number.

**Required Parameters:**
- `phoneNumber` (string): The phone number to retrieve

**Example Usage:**
```json
{
  "phoneNumber": "+14155551234"
}
```

#### `update_phone_number`
Updates a phone number's configuration.

**Required Parameters:**
- `phoneNumber` (string): The phone number to update

**Optional Parameters:**
- `inboundAgentId` (string): New inbound agent ID
- `outboundAgentId` (string): New outbound agent ID
- `nickname` (string): New nickname
- `inboundWebhookUrl` (string): New inbound webhook URL

**Example Usage:**
```json
{
  "phoneNumber": "+14155551234",
  "inboundAgentId": "agent_new_123",
  "nickname": "Updated Business Line"
}
```

#### `delete_phone_number`
Deletes a specific phone number.

**Required Parameters:**
- `phoneNumber` (string): The phone number to delete

**Example Usage:**
```json
{
  "phoneNumber": "+14155551234"
}
```

### 4. Voice Management Tools

#### `list_voices`
Lists all available Retell voices.

**Parameters:** None

**Example Usage:**
```json
{}
```

#### `get_voice`
Retrieves details of a specific voice.

**Required Parameters:**
- `voiceId` (string): The ID of the voice to retrieve

**Example Usage:**
```json
{
  "voiceId": "voice_12345"
}
```

### 5. Retell LLM Management Tools

#### `list_retell_llms`
Lists all available Retell LLMs.

**Parameters:** None

**Example Usage:**
```json
{}
```

#### `create_retell_llm`
Creates a new Retell LLM configuration.

**Required Parameters:**
- `general_prompt` (string): Prompt for the agent to follow

**Optional Parameters:**
- `version` (number): Version of the Retell LLM
- `model` (enum): Underlying text LLM
  - Options: "gpt-4o", "gpt-4o-mini", "gpt-4.1", "gpt-4.1-mini", "gpt-4.1-nano", "claude-3.7-sonnet", "claude-3.5-haiku", "gemini-2.0-flash", "gemini-2.0-flash-lite"
- `s2s_model` (enum): Speech-to-speech model
  - Options: "gpt-4o-realtime", "gpt-4o-mini-realtime"
- `model_temperature` (number): Model temperature (0-1)
- `model_high_priority` (boolean): Use high priority pool
- `tool_call_strict_mode` (boolean): Use structured output
- `general_tools` (array): Array of tools the model may call
- `states` (array): States of the LLM
- `starting_state` (string): Name of the starting state
- `begin_message` (string): First utterance said by the agent
- `default_dynamic_variables` (object): Default dynamic variables
- `knowledge_base_ids` (array): Array of knowledge base IDs

**Example Usage:**
```json
{
  "general_prompt": "You are a helpful customer service agent. Be polite and professional.",
  "model": "gpt-4o",
  "model_temperature": 0.7,
  "begin_message": "Hello! Thank you for calling our customer service. How can I help you today?",
  "default_dynamic_variables": {
    "company_name": "Acme Corp"
  }
}
```

#### `get_retell_llm`
Retrieves details of a specific Retell LLM.

**Required Parameters:**
- `llmId` (string): The ID of the Retell LLM to retrieve

**Example Usage:**
```json
{
  "llmId": "llm_12345"
}
```

#### `update_retell_llm`
Updates an existing Retell LLM configuration.

**Required Parameters:**
- `llmId` (string): The ID of the Retell LLM to update

**Optional Parameters:**
- `version` (number): New version
- `model` (enum): New model
- `s2s_model` (enum): New speech-to-speech model
- `model_temperature` (number): New temperature
- `model_high_priority` (boolean): New high priority setting
- `tool_call_strict_mode` (boolean): New strict mode setting
- `general_prompt` (string): New general prompt
- `general_tools` (array): New general tools
- `begin_message` (string): New begin message
- `default_dynamic_variables` (object): New default variables
- `knowledge_base_ids` (array): New knowledge base IDs

**Example Usage:**
```json
{
  "llmId": "llm_12345",
  "general_prompt": "Updated prompt for better customer service",
  "model_temperature": 0.8
}
```

#### `delete_retell_llm`
Deletes a specific Retell LLM.

**Required Parameters:**
- `llmId` (string): The ID of the Retell LLM to delete

**Example Usage:**
```json
{
  "llmId": "llm_12345"
}
```

## Common Workflows

### 1. Creating a Complete Voice Agent Setup

1. **List available voices** to choose a voice
2. **Create a Retell LLM** with appropriate prompts and configuration
3. **Create an agent** using the voice and LLM
4. **Create a phone number** and assign the agent
5. **Make a test call** to verify the setup

### 2. Managing Customer Service Calls

1. **List existing agents** to find the appropriate one
2. **Create a phone call** with the agent
3. **Monitor the call** using get_call
4. **Update call metadata** as needed
5. **Review call results** after completion

### 3. Agent Optimization

1. **Get agent details** to understand current configuration
2. **Update agent settings** based on performance data
3. **Test with web calls** before using phone calls
4. **Monitor call performance** and iterate

## Best Practices

### Agent Configuration
- Use specific, clear prompts for better conversation quality
- Set appropriate voice temperature and responsiveness
- Configure language settings for target audience
- Use dynamic variables for personalization

### Call Management
- Always include metadata for call tracking
- Use dynamic variables for context-aware conversations
- Monitor call status and handle failures gracefully
- Clean up completed calls to manage storage

### Phone Number Management
- Use descriptive nicknames for easy identification
- Assign appropriate agents for inbound/outbound calls
- Configure webhooks for real-time call processing
- Monitor phone number usage and costs

### LLM Configuration
- Choose appropriate models based on use case
- Set reasonable temperature for conversation naturalness
- Use tool configurations for specific call scenarios
- Implement proper error handling and fallbacks

## Error Handling

Common error scenarios and solutions:

1. **Invalid Agent ID**: Always verify agent exists before using
2. **Phone Number Unavailable**: Check area code availability
3. **Call Failures**: Implement retry logic with exponential backoff
4. **Voice Configuration Issues**: Validate voice ID and model compatibility
5. **LLM Configuration Errors**: Ensure all required parameters are provided

## Rate Limits and Quotas

- Respect RetellAI's rate limits for API calls
- Implement proper queuing for high-volume scenarios
- Monitor usage to avoid quota exhaustion
- Use appropriate timeouts for long-running operations

## Security Considerations

- Never expose API keys in client-side code
- Use environment variables for sensitive configuration
- Implement proper authentication and authorization
- Validate all input parameters before API calls
- Log security-relevant events for monitoring

## Integration Examples

### Claude Desktop Integration
```json
{
  "mcpServers": {
    "retellai-mcp-server": {
      "command": "npx",
      "args": ["-y", "@abhaybabbar/retellai-mcp-server"],
      "env": {
        "RETELL_API_KEY": "<your_retellai_token>"
      }
    }
  }
}
```

### Environment Setup
```bash
# Install dependencies
npm install

# Set environment variable
export RETELL_API_KEY=your_api_key_here

# Run the server
node src/index.js
```

This documentation provides comprehensive coverage of all available tools, their parameters, and usage patterns for the RetellAI MCP Server. Use this as a reference for AI assistants to understand how to effectively interact with RetellAI's voice services.
