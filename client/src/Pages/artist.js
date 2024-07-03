// src/App.js
import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";

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
      // const fetchData = await fetch("http://localhost:8080/api/v1/artist/top", {
      //   method: "GET",
      //   headers: {
      //     authorization: accessToken,
      //   },
      // });
      //console.log("🚀 ~ fetchTopArtists ~ fetchData:", fetchData);
      //const data = await fetchData.json();
      const data = [
        {
          name: "Kumar Sanu",
          country: "IN",
        },
        {
          name: "Pritam",
          country: "IN",
        },
        {
          name: "Arijit Singh",
          country: "IN",
        },
        {
          name: "Katy Perry",
          country: "US",
        },
      ];
      const dummyData = [
        { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
        { lat: 40.7128, lng: -74.006, label: "New York" },
        { lat: 51.5074, lng: -0.1278, label: "London" },
        { lat: 35.6895, lng: 139.6917, label: "Tokyo" },
        { lat: -33.8688, lng: 151.2093, label: "Sydney" },
      ];
      console.log("🚀 ~ fetchTopArtists ~ data:", data);
      setArtists(dummyData);
    };

    fetchTopArtists();
  }, [accessToken]);

  return (
    <div className="h-full w-full bg-black flex flex-col items-center justify-center">
      <h1 className="text-white font-bold text-2xl">Your Top Artists</h1>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        //backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={artists}
        labelLat={(d) => d.lat}
        labelLng={(d) => d.lng}
        labelText={(d) => d.label}
        labelSize={() => 1.5}
        labelDotRadius={() => 0.5}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
      />
      <form action="http://localhost:8080/api/v1/user/login">
        <button className="p-2 flex items-center bg-white text-black w-200 rounded-full font-semibold">
          <img
            width={30}
            height={30}
            src={
              "https://i0.wp.com/brandingforum.org/wp-content/uploads/2023/10/Spotify-logo-500x281-1.png?resize=500%2C281&ssl=1"
            }
            alt="spotify logo"
          />
          Share on Twitter
        </button>
      </form>
    </div>
  );
};

export default Artist;
