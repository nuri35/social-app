const { createClient } = require("redis");
const { REDIS_DB_HOST, REDIS_DB_PORT, REDIS_DB_USER, REDIS_PSW } = process.env;
const client = createClient({
  url: `redis://${REDIS_DB_USER}:${REDIS_PSW}@${REDIS_DB_HOST}:${REDIS_DB_PORT}`,
});

module.exports = client;
