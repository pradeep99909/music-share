require("dotenv").config();

const VARIABLE = {
  PORT: process.env.PORT,
  SPOTIFY_URL: process.env.SPOTIFY_URL,
  SPOTIFY_API: process.env.SPOTIFY_API,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URL: process.env.REDIRECT_URL,
  AIRTABLE_TOKEN: process.env.AIRTABLE_TOKEN,
  BASE_ID: process.env.BASE_ID,
  TABLE_NAME: process.env.TABLE_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
};

module.exports = {
  VARIABLE,
};
