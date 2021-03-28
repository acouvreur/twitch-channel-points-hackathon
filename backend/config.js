require('dotenv').config();

const SERVER_PORT = '8080';
const config = {
  SERVER_PORT: SERVER_PORT,
  REDIRECT_URI: `http://localhost:${SERVER_PORT}/auth/callback`,
  CLIENT_ID: process.env.CLIENT_ID || "fy0m2ro22ium9id4jfz7gbe3wrbfys",
  CLIENT_SECRET: process.env.CLIENT_SECRET, // This should not be used anymore
  SCOPES: process.env.SCOPES || 'channel:manage:redemptions channel:read:subscriptions',
  POLLING_INTERVAL: 5000,
  PLUGIN_MINECRAFT_SERVER_URL: process.env.PLUGIN_MINECRAFT_SERVER_URL || 'http://localhost:8001',
  PLUGIN_MIDI_OUTPUT: 'twitch'
}

console.log(`[LOG] Using config ${JSON.stringify(config)}`);

module.exports = config;