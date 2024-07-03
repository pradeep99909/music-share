const _ = require("lodash");
const request = require("request");
const config = require("../../config");
const topArtist = (req, res) => {
  console.log("🚀 ~ topArtist ~ req.headers:", req.headers);
  const access_token = req.headers.authorization;
  const options = {
    url: config.ENVIRONMENT.VARIABLE.SPOTIFY_URL + "/v1/me/top/artists",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  request.get(options, (error, response, body) => {
    console.log("🚀 ~ request.get ~ body:", body);
    if (error || body.error) return res.status(500).send(error);
    body = body.items.map((artist) => _.pick(artist, ["name"]));
    return res.json(body);
  });
};

module.exports = {
  topArtist,
};
