// src/App.js
import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import COUNTRY from "../config/country";
import VARIABLE from "../config/env";

const Artist = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.search;
    console.log("🚀 ~ useEffect ~ hash:", hash);
    let token = "";
    //console.log("🚀 ~ useEffect ~ token:", token);

    if (hash) {
      token = new URLSearchParams(hash.replace("#", "?")).get("access_token");
      console.log("🚀 ~ useEffect ~ token 1:", token);
      window.location.hash = "";
      //window.localStorage.setItem("token", token);
    }

    setAccessToken(token);
  }, []);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const fetchData = await fetch(VARIABLE.SERVER + "/api/v1/artist/top", {
        method: "GET",
        headers: {
          authorization: accessToken,
        },
      });
      console.log("🚀 ~ fetchTopArtists ~ fetchData:", fetchData);
      const data = await fetchData.json();
      console.log("🚀 ~ fetchTopArtists ~ data 0:", data);
      for (let i = 0; i < data.length; i++) {
        data[i]["lat"] = COUNTRY[data[i]["country"]][0];
        data[i]["lng"] = COUNTRY[data[i]["country"]][1];
      }
      console.log("🚀 ~ fetchTopArtists ~ data:", data);
      setArtists(data);
    };

    fetchTopArtists();
  }, [accessToken]);

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center top-0 bottom-0 absolute">
      <h1 className="text-white font-bold text-2xl">Your Top Artists</h1>
      <Globe
        height={500}
        width={500}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        //backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={artists}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelText={(d) => d.name}
        labelSize={() => 1.5}
        labelDotRadius={() => 0.5}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
      />
      <button
        className="p-2 flex items-center bg-white text-black w-200 rounded-full font-semibold"
        onClick={async (event) => {
          event.preventDefault();
          const fetchData = await fetch(
            VARIABLE.SERVER + "/api/v1/user/share",
            {
              method: "GET",
              headers: {
                authorization: accessToken,
              },
            }
          );
          //const records = await fetchData.body;
          const { id } = await fetchData.json();
          const url =
            "https://twitter.com/intent/tweet?url=" +
            VARIABLE.CLIENT +
            "/share/" +
            id +
            "&text=" +
            "My Spotify Top Artists Country";
          window.open(url);
        }}
      >
        <img
          width={20}
          height={20}
          src={
            "https://w7.pngwing.com/pngs/748/680/png-transparent-twitter-x-logo.png"
          }
          alt="spotify logo"
        />
        Share on Twitter
      </button>
    </div>
  );
};

export default Artist;
