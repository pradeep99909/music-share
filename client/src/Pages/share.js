// src/App.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Globe from "react-globe.gl";
import COUNTRY from "../config/country";
import VARIABLE from "../config/env";

const Share = () => {
  const { id } = useParams();
  console.log("🚀 ~ Share ~ id:", id);
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const fetchTopArtists = async () => {
      const fetchData = await fetch(
        VARIABLE.SERVER + "/api/v1/user/share/" + id,
        {
          method: "GET",
        }
      );
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
  }, []);

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
    </div>
  );
};

export default Share;
