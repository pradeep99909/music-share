const _ = require("lodash");
const request = require("request");
const util = require("util");
const requestGetPromise = util.promisify(request.get);
const config = require("../../config");
const topArtist = async (access_token) => {
  try {
    console.log("🚀 ~ topArtist ~ access_token:", access_token);
    const options = {
      url: config.ENVIRONMENT.VARIABLE.SPOTIFY_API + "/v1/me/top/artists",
      headers: {
        Authorization: "Bearer " + access_token,
      },
      json: true,
    };

    let data = await requestGetPromise(options);
    console.log("🚀 ~ topArtist ~ data.body:", data.body);
    if (data.body.error) {
      throw "spotify_" + (data.body.error || data.body.error.message);
    }
    console.log("🚀 ~ topArtist ~ data.body:", data.body);
    const body = data.body;
    data = body.items.map((artist) => _.pick(artist, ["name"]));
    for (let i = 0; i < data.length; i++) {
      data[i].country = await getArtistCountry(data[i].name);
    }
    console.log("🚀 ~ topArtist ~ data:", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  topArtist,
};

async function getArtistCountry(artistName) {
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
}
