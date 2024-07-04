const request = require("request");
const config = require("../../config");
const artistService = require("./artist.service");

const share = async (token) => {
  try {
    // Replace with your actual base ID, table name or ID, and API key
    const artists = await artistService.topArtist(token);
    const baseId = config.ENVIRONMENT.VARIABLE.BASE_ID;
    const tableNameOrId = config.ENVIRONMENT.VARIABLE.TABLE_NAME;
    const apiKey = config.ENVIRONMENT.VARIABLE.AIRTABLE_TOKEN;

    const url = `https://api.airtable.com/v0/${baseId}/${tableNameOrId}`;
    console.log("🚀 ~ share ~ url:", url);
    const id = crypto.randomUUID();
    const data = {
      records: [],
    };
    for (let i = 0; i < artists.length; i++) {
      data.records.push({
        fields: {
          id,
          name: artists[i].name,
          country: artists[i].country,
        },
      });
    }
    console.log("🚀 ~ share ~ data:", JSON.stringify(data));
    const options = {
      url: url,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    request.post(options, (error, response, body) => {
      if (error) {
        console.error("Error making request:", error);
        return;
      }

      if (response.statusCode !== 200) {
        console.error("Failed to fetch data:", response.statusCode, body);
        return;
      }

      console.log("Data received:", body);
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  share,
};
