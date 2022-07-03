const { createClient } = require("redis");
const { DB_HOST, REDIS_DB_PORT, REDIS_DB_USER, REDIS_PSW } = process.env;
const client = createClient({
  url: `redis://${REDIS_DB_USER}:${REDIS_PSW}@${DB_HOST}:${REDIS_DB_PORT}`,
  legacyMode: true,
});

module.exports = client;
