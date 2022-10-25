const {
  INVITATION_EXPIRATION_HOURS,
  API_KEY,
  API_KEY_HEADER,
} = process.env;

export const appConfig = {
  invitationExpirationHours: Number(INVITATION_EXPIRATION_HOURS) || 72,
  apiKey: API_KEY || 'temporary-api-key',
  apiKeyHeader: API_KEY_HEADER || 'x-api-key',
};
