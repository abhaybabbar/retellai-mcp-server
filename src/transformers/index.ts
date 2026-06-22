import { z } from "zod";
import {
  CreatePhoneCallInputSchema,
  CreateWebCallInputSchema,
  CallOutputSchema,
  AgentOutputSchema,
  PhoneNumberOutputSchema,
  VoiceOutputSchema,
  KnowledgeBaseOutputSchema,
  CreateAgentInputSchema,
  UpdateAgentInputSchema,
  CreateRetellLLMInputSchema,
  UpdateRetellLLMInputSchema,
  RetellLLMOutputSchema,
  ListCallsInputSchema,
  UpdateCallInputSchema,
} from "../schemas/index.js";

// ===== Call Transformers =====

export const transformPhoneCallInput = (
  input: z.infer<typeof CreatePhoneCallInputSchema>
) => {
  return {
    from_number: input.fromNumber,
    to_number: input.toNumber,
    override_agent_id: input.overrideAgentId,
    override_agent_version: input.overrideAgentVersion,
    direction: input.direction,
    metadata: input.metadata,
    retell_llm_dynamic_variables: input.retellLlmDynamicVariables,
    opt_out_sensitive_data_storage: input.optOutSensitiveDataStorage,
    opt_in_signed_url: input.optInSignedUrl,
  };
};

export const transformWebCallInput = (
  input: z.infer<typeof CreateWebCallInputSchema>
) => {
  return {
    agent_id: input.agentId,
    metadata: input.metadata,
    retell_llm_dynamic_variables: input.retellLlmDynamicVariables,
    opt_out_sensitive_data_storage: input.optOutSensitiveDataStorage,
    opt_in_signed_url: input.optInSignedUrl,
  };
};

export const transformCallOutput = (data: any) => {
  return {
    call_id: data.call_id,
    call_type: data.call_type,
    agent_id: data.agent_id,
    version: data.version,
    call_status: data.call_status,
    metadata: data.metadata,
    start_timestamp: data.start_timestamp,
    end_timestamp: data.end_timestamp,
    transcript: data.transcript,
    recording_url: data.recording_url,
    disconnection_reason: data.disconnection_reason,
    call_analysis: data.call_analysis,
    call_cost: data.call_cost,
  };
};

export const transformListCallsInput = (
  data: z.infer<typeof ListCallsInputSchema>
) => {
  const filter_criteria: Record<string, unknown> = {};

  if (data.agentId !== undefined) {
    filter_criteria.agent = [{ agent_id: data.agentId }];
  }

  if (data.startTimestamp !== undefined) {
    filter_criteria.start_timestamp = {
      type: "number",
      op: "ge",
      value: data.startTimestamp,
    };
  }

  if (data.endTimestamp !== undefined) {
    filter_criteria.end_timestamp = {
      type: "number",
      op: "le",
      value: data.endTimestamp,
    };
  }

  return {
    ...(Object.keys(filter_criteria).length ? { filter_criteria } : {}),
    limit: data.limit,
    skip: data.offset,
  };
};

export const transformUpdateCallInput = (
  data: z.infer<typeof UpdateCallInputSchema>
) => {
  return {
    metadata: data.metadata,
    retell_llm_dynamic_variables: data.dynamicVariables,
  };
};

// ===== Agent Transformers =====

export function transformAgentInput(
  input: z.infer<typeof CreateAgentInputSchema>
) {
  return {
    response_engine: input.response_engine,
    voice_id: input.voice_id,
    agent_name: input.agent_name,
    voice_model: input.voice_model,
    fallback_voice_ids: input.fallback_voice_ids,
    voice_temperature: input.voice_temperature,
    voice_speed: input.voice_speed,
    volume: input.volume,
    responsiveness: input.responsiveness,
    interruption_sensitivity: input.interruption_sensitivity,
    enable_backchannel: input.enable_backchannel,
    backchannel_frequency: input.backchannel_frequency,
    backchannel_words: input.backchannel_words,
    reminder_trigger_ms: input.reminder_trigger_ms,
    reminder_max_count: input.reminder_max_count,
    ambient_sound: input.ambient_sound,
    ambient_sound_volume: input.ambient_sound_volume,
    language: input.language,
    webhook_url: input.webhook_url,
    boosted_keywords: input.boosted_keywords,
    enable_transcription_formatting: input.enable_transcription_formatting,
    opt_out_sensitive_data_storage: input.opt_out_sensitive_data_storage,
    opt_in_signed_url: input.opt_in_signed_url,
    pronunciation_dictionary: input.pronunciation_dictionary,
    normalize_for_speech: input.normalize_for_speech,
    end_call_after_silence_ms: input.end_call_after_silence_ms,
    max_call_duration_ms: input.max_call_duration_ms,
    enable_voicemail_detection: input.enable_voicemail_detection,
    voicemail_message: input.voicemail_message,
    voicemail_detection_timeout_ms: input.voicemail_detection_timeout_ms,
    post_call_analysis_data: input.post_call_analysis_data,
    post_call_analysis_model: input.post_call_analysis_model,
    begin_message_delay_ms: input.begin_message_delay_ms,
    ring_duration_ms: input.ring_duration_ms,
    stt_mode: input.stt_mode,
  };
}

export function transformUpdateAgentInput(
  input: z.infer<typeof UpdateAgentInputSchema>
) {
  const updateData: any = {};

  if (input.response_engine !== undefined)
    updateData.response_engine = input.response_engine;
  if (input.voice_id !== undefined) updateData.voice_id = input.voice_id;
  if (input.agent_name !== undefined) updateData.agent_name = input.agent_name;
  if (input.voice_model !== undefined)
    updateData.voice_model = input.voice_model;
  if (input.fallback_voice_ids !== undefined)
    updateData.fallback_voice_ids = input.fallback_voice_ids;
  if (input.voice_temperature !== undefined)
    updateData.voice_temperature = input.voice_temperature;
  if (input.voice_speed !== undefined)
    updateData.voice_speed = input.voice_speed;
  if (input.volume !== undefined) updateData.volume = input.volume;
  if (input.responsiveness !== undefined)
    updateData.responsiveness = input.responsiveness;
  if (input.interruption_sensitivity !== undefined)
    updateData.interruption_sensitivity = input.interruption_sensitivity;
  if (input.enable_backchannel !== undefined)
    updateData.enable_backchannel = input.enable_backchannel;
  if (input.backchannel_frequency !== undefined)
    updateData.backchannel_frequency = input.backchannel_frequency;
  if (input.backchannel_words !== undefined)
    updateData.backchannel_words = input.backchannel_words;
  if (input.reminder_trigger_ms !== undefined)
    updateData.reminder_trigger_ms = input.reminder_trigger_ms;
  if (input.reminder_max_count !== undefined)
    updateData.reminder_max_count = input.reminder_max_count;
  if (input.ambient_sound !== undefined)
    updateData.ambient_sound = input.ambient_sound;
  if (input.ambient_sound_volume !== undefined)
    updateData.ambient_sound_volume = input.ambient_sound_volume;
  if (input.language !== undefined) updateData.language = input.language;
  if (input.webhook_url !== undefined)
    updateData.webhook_url = input.webhook_url;
  if (input.boosted_keywords !== undefined)
    updateData.boosted_keywords = input.boosted_keywords;
  if (input.enable_transcription_formatting !== undefined)
    updateData.enable_transcription_formatting =
      input.enable_transcription_formatting;
  if (input.opt_out_sensitive_data_storage !== undefined)
    updateData.opt_out_sensitive_data_storage =
      input.opt_out_sensitive_data_storage;
  if (input.opt_in_signed_url !== undefined)
    updateData.opt_in_signed_url = input.opt_in_signed_url;
  if (input.pronunciation_dictionary !== undefined)
    updateData.pronunciation_dictionary = input.pronunciation_dictionary;
  if (input.normalize_for_speech !== undefined)
    updateData.normalize_for_speech = input.normalize_for_speech;
  if (input.end_call_after_silence_ms !== undefined)
    updateData.end_call_after_silence_ms = input.end_call_after_silence_ms;
  if (input.max_call_duration_ms !== undefined)
    updateData.max_call_duration_ms = input.max_call_duration_ms;
  if (input.enable_voicemail_detection !== undefined)
    updateData.enable_voicemail_detection = input.enable_voicemail_detection;
  if (input.voicemail_message !== undefined)
    updateData.voicemail_message = input.voicemail_message;
  if (input.voicemail_detection_timeout_ms !== undefined)
    updateData.voicemail_detection_timeout_ms =
      input.voicemail_detection_timeout_ms;
  if (input.post_call_analysis_data !== undefined)
    updateData.post_call_analysis_data = input.post_call_analysis_data;
  if (input.post_call_analysis_model !== undefined)
    updateData.post_call_analysis_model = input.post_call_analysis_model;
  if (input.begin_message_delay_ms !== undefined)
    updateData.begin_message_delay_ms = input.begin_message_delay_ms;
  if (input.ring_duration_ms !== undefined)
    updateData.ring_duration_ms = input.ring_duration_ms;
  if (input.stt_mode !== undefined) updateData.stt_mode = input.stt_mode;

  return updateData;
}

export function transformAgentOutput(
  agent: any
): z.infer<typeof AgentOutputSchema> {
  return {
    agent_id: agent.agent_id,
    response_engine: agent.response_engine,
    agent_name: agent.agent_name,
    version: agent.version,
    voice_id: agent.voice_id,
    voice_model: agent.voice_model,
    fallback_voice_ids: agent.fallback_voice_ids,
    voice_temperature: agent.voice_temperature,
    voice_speed: agent.voice_speed,
    volume: agent.volume,
    responsiveness: agent.responsiveness,
    interruption_sensitivity: agent.interruption_sensitivity,
    enable_backchannel: agent.enable_backchannel,
    backchannel_frequency: agent.backchannel_frequency,
    backchannel_words: agent.backchannel_words,
    reminder_trigger_ms: agent.reminder_trigger_ms,
    reminder_max_count: agent.reminder_max_count,
    ambient_sound: agent.ambient_sound,
    ambient_sound_volume: agent.ambient_sound_volume,
    language: agent.language,
    webhook_url: agent.webhook_url,
    boosted_keywords: agent.boosted_keywords,
    enable_transcription_formatting: agent.enable_transcription_formatting,
    opt_out_sensitive_data_storage: agent.opt_out_sensitive_data_storage,
    opt_in_signed_url: agent.opt_in_signed_url,
    pronunciation_dictionary: agent.pronunciation_dictionary,
    normalize_for_speech: agent.normalize_for_speech,
    end_call_after_silence_ms: agent.end_call_after_silence_ms,
    max_call_duration_ms: agent.max_call_duration_ms,
    enable_voicemail_detection: agent.enable_voicemail_detection,
    voicemail_message: agent.voicemail_message,
    voicemail_detection_timeout_ms: agent.voicemail_detection_timeout_ms,
    post_call_analysis_data: agent.post_call_analysis_data,
    post_call_analysis_model: agent.post_call_analysis_model,
    begin_message_delay_ms: agent.begin_message_delay_ms,
    ring_duration_ms: agent.ring_duration_ms,
    stt_mode: agent.stt_mode,
    last_modification_timestamp: agent.last_modification_timestamp,
  };
}

// ===== Phone Number Transformers =====

export function transformPhoneNumberOutput(
  phoneNumber: any
): z.infer<typeof PhoneNumberOutputSchema> {
  return {
    phone_number: phoneNumber.phone_number,
    phone_number_pretty: phoneNumber.phone_number_pretty,
    phone_number_type: phoneNumber.phone_number_type,
    inbound_agent_id: phoneNumber.inbound_agent_id,
    outbound_agent_id: phoneNumber.outbound_agent_id,
    area_code: phoneNumber.area_code,
    nickname: phoneNumber.nickname,
    inbound_webhook_url: phoneNumber.inbound_webhook_url,
    last_modification_timestamp: phoneNumber.last_modification_timestamp,
  };
}

// ===== Voice Transformers =====

export function transformVoiceOutput(
  voice: any
): z.infer<typeof VoiceOutputSchema> {
  return {
    voice_id: voice.voice_id,
    voice_name: voice.voice_name,
    provider: voice.provider,
    accent: voice.accent,
    gender: voice.gender,
    age: voice.age,
  };
}

// ===== Knowledge Base Transformers =====

export function transformKnowledgeBaseOutput(
  kb: any
): z.infer<typeof KnowledgeBaseOutputSchema> {
  return {
    knowledge_base_id: kb.knowledge_base_id,
    name: kb.name,
    description: kb.description,
    created_at: kb.created_at,
    updated_at: kb.updated_at,
    sources: kb.sources,
  };
}

// ===== Retell LLM Transformers =====

export function transformRetellLLMInput(
  input: z.infer<typeof CreateRetellLLMInputSchema>
) {
  return {
    version: input.version,
    model: input.model,
    s2s_model: input.s2s_model,
    model_temperature: input.model_temperature,
    model_high_priority: input.model_high_priority,
    tool_call_strict_mode: input.tool_call_strict_mode,
    general_prompt: input.general_prompt,
    general_tools: input.general_tools as any,
    states: input.states as any,
    starting_state: input.starting_state,
    begin_message: input.begin_message,
    default_dynamic_variables: input.default_dynamic_variables,
    knowledge_base_ids: input.knowledge_base_ids,
  };
}

export function transformUpdateRetellLLMInput(
  input: z.infer<typeof UpdateRetellLLMInputSchema>
) {
  const updateData: any = {};

  if (input.version !== undefined) updateData.version = input.version;
  if (input.model !== undefined) updateData.model = input.model;
  if (input.s2s_model !== undefined) updateData.s2s_model = input.s2s_model;
  if (input.model_temperature !== undefined)
    updateData.model_temperature = input.model_temperature;
  if (input.model_high_priority !== undefined)
    updateData.model_high_priority = input.model_high_priority;
  if (input.tool_call_strict_mode !== undefined)
    updateData.tool_call_strict_mode = input.tool_call_strict_mode;
  if (input.general_prompt !== undefined)
    updateData.general_prompt = input.general_prompt;
  if (input.general_tools !== undefined)
    updateData.general_tools = input.general_tools;
  if (input.states !== undefined) updateData.states = input.states;
  if (input.starting_state !== undefined)
    updateData.starting_state = input.starting_state;
  if (input.begin_message !== undefined)
    updateData.begin_message = input.begin_message;
  if (input.default_dynamic_variables !== undefined)
    updateData.default_dynamic_variables = input.default_dynamic_variables;
  if (input.knowledge_base_ids !== undefined)
    updateData.knowledge_base_ids = input.knowledge_base_ids;

  return updateData;
}

export function transformRetellLLMOutput(
  llm: any
): z.infer<typeof RetellLLMOutputSchema> {
  return {
    llm_id: llm.llm_id,
    version: llm.version,
    model: llm.model,
    s2s_model: llm.s2s_model,
    model_temperature: llm.model_temperature,
    model_high_priority: llm.model_high_priority,
    tool_call_strict_mode: llm.tool_call_strict_mode,
    general_prompt: llm.general_prompt,
    general_tools: llm.general_tools,
    states: llm.states,
    starting_state: llm.starting_state,
    begin_message: llm.begin_message,
    default_dynamic_variables: llm.default_dynamic_variables,
    knowledge_base_ids: llm.knowledge_base_ids,
    last_modification_timestamp: llm.last_modification_timestamp,
  };
}
