const request = require("request");
const util = require("util");
const requestPostPromise = util.promisify(request.post);
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

    const response = await requestPostPromise(options);
    response.body = JSON.parse(response.body);
    console.log("🚀 ~ share ~ response.body:", response.body);
    return { id };
  } catch (err) {
    console.error(err);
  }
};

const getShare = async (id) => {
  const baseId = config.ENVIRONMENT.VARIABLE.BASE_ID;
  const tableNameOrId = config.ENVIRONMENT.VARIABLE.TABLE_NAME;
  const apiKey = config.ENVIRONMENT.VARIABLE.AIRTABLE_TOKEN;

  const url = `https://api.airtable.com/v0/${baseId}/${tableNameOrId}?filterByFormula={id}='${id}'`;
  const options = {
    url: url,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  const response = await requestGetPromise(options);
  response.body = JSON.parse(response.body);
  const data = [];
  console.log("🚀 ~ get share ~ response.body:", JSON.stringify(response.body));
  for (let i = 0; i < response.body.records.length; i++) {
    data.push({
      name: response.body.records[i].fields.name,
      country: response.body.records[i].fields.country,
    });
  }
  return data;
};

module.exports = {
  share,
  getShare,
};

getShare("c8cda8ab-2c21-48af-ab4f-2059acaaaa68");
