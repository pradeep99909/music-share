const querystring = require("querystring");
const { Buffer } = require("buffer");
const request = require("request");
const config = require("../../config");

const userLogin = (req, res) => {
  var state = crypto.randomUUID();
  var scope = "user-read-private user-read-email user-top-read";

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
        "http://localhost:3000/artist?" +
          querystring.stringify({ access_token: access_token })
      );
    });
  }
};

module.exports = {
  userLogin,
  userCallback,
};
