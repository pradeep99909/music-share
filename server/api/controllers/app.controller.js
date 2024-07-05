const querystring = require("querystring");
const { Buffer } = require("buffer");
const request = require("request");
const config = require("../../config");
const services = require("../services");

const userLogin = (req, res) => {
  var state = crypto.randomUUID();
  var scope =
    "user-read-private user-read-email user-top-read user-library-read";

  res.redirect(
    config.ENVIRONMENT.VARIABLE.SPOTIFY_URL +
      "/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: config.ENVIRONMENT.VARIABLE.CLIENT_ID,
        scope: scope,
        redirect_uri: config.ENVIRONMENT.VARIABLE.REDIRECT_URL,
        state: state,
      })
  );
};

const userCallback = (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;

  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: config.ENVIRONMENT.VARIABLE.SPOTIFY_URL + "/api/token",
      method: "POST",
      form: {
        code: code,
        redirect_uri: config.ENVIRONMENT.VARIABLE.REDIRECT_URL,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(
            config.ENVIRONMENT.VARIABLE.CLIENT_ID +
              ":" +
              config.ENVIRONMENT.VARIABLE.CLIENT_SECRET
          ).toString("base64"),
      },
      json: true,
    };
    request.post(authOptions, (error, response, body) => {
      const access_token = body.access_token;
      res.redirect(
        config.ENVIRONMENT.VARIABLE.CLIENT_URL +
          "/artist?" +
          querystring.stringify({ access_token: access_token })
      );
    });
  }
};

const userShare = async (req, res) => {
  try {
    const access_token = req.headers.authorization;
    const data = await services.appService.share(access_token);
    return res.status(200).send(data);
    // return res.redirect(
    //   "https://www.twitter.com/share?url=https://localhost:3000/share/" +
    //     data.id
    // );
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getShare = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await services.appService.getShare(id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  userLogin,
  userCallback,
  userShare,
  getShare,
};
