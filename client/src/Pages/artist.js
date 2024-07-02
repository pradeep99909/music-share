// src/App.js
import React, { useState, useEffect } from "react";

const Artist = () => {
  const [accessToken, setAccessToken] = useState(null);
  //const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.search;
    console.log("🚀 ~ useEffect ~ hash:", hash);
    let token = window.localStorage.getItem("token");
    console.log("🚀 ~ useEffect ~ token:", token);

    if (!token && hash) {
      token = new URLSearchParams(hash.replace("#", "?")).get("access_token");
      console.log("🚀 ~ useEffect ~ token 1:", token);
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setAccessToken(token);
  }, []);

  // useEffect(() => {
  //   const fetchTopArtists = async () => {
  //     const { data } = await axios.get('http://localhost:8888/top-artists', {
  //       params: { access_token: accessToken }
  //     });
  //     setArtists(data.items);
  //   };

  //   fetchTopArtists();
  // }, [accessToken]);

  return (
    <div>
      <h1>Your Top Artists</h1>
      <p>{JSON.stringify(accessToken)}</p>
    </div>
  );
};

export default Artist;
