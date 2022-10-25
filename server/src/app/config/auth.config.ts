const {
  ACCESS_SECRET,
  ACCESS_EXPIRATION_HOURS,
  REFRESH_SECRET,
  REFRESH_EXPIRATION_HOURS,
  SALT_ROUNDS,
} = process.env;

export const authConfig = {
  accessSecret: ACCESS_SECRET || 'temporary-access-secret',
  accessExpirationHours: Number(ACCESS_EXPIRATION_HOURS) || 1,
  refreshSecret: REFRESH_SECRET || 'temporary-refresh-secret',
  refreshExpirationHours: Number(REFRESH_EXPIRATION_HOURS) || 168,
  saltRounds: Number(SALT_ROUNDS) || 10,
};
