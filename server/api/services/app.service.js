const request = require("request");
const util = require("util");
const requestGetPromise = util.promisify(request.get);
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
      artists[i]["country"] = await getArtistCountry(artists[i].name);
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

const getArtistCountry = async (artistName) => {
  try {
    console.log("🚀 ~ getArtistCountry ~ artistName:", artistName);
    const options = {
      url:
        "https://musicbrainz.org/ws/2/artist/?query=artist:" +
        artistName +
        "&fmt=json",
      headers: {
        "User-Agent": "Music Share",
      },
    };

    const data = await requestGetPromise(options);
    const body = JSON.parse(data.body);
    console.log("🚀 ~ getArtistCountry ~ body:", body);
    return body.artists[0].country;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  share,
  getArtistCountry,
};
