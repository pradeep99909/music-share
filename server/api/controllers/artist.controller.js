const services = require("../services");

const topArtist = async (req, res) => {
  try {
    const access_token = req.headers.authorization;
    const data = await services.artistService.topArtist(access_token);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  topArtist,
};
