import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import backgroundImg from "./images/pattern-bg-desktop.png";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const apiKey = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [refreshMap, setRefreshMap] = useState(false);

  const hundleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const submitBtn = () => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_LiQ8be1aK0B8U7YFXLFD3ZgZgDpOM&ipAddress=${inputValue}`
      )
      .then((response) => {
        setData(response.data);
        setRefreshMap(true);
      })
      .catch((err) => console.log(err), setRefreshMap(false));
  };

  useEffect(() => {
    submitBtn();
  }, []);

  useEffect(() => {
    if (refreshMap) {
      setRefreshMap(false);
    }
  }, [refreshMap]);

  const markers = [
    {
      geocode: [data?.location?.lat, data?.location?.lng],
    },
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/3179/3179068.png",
    iconSize: [38, 38],
  });

  return (
    <div id="home">
      <div className="header relative">
        <p className="absolute inset-0 flex justify-center top-[3rem] text-2xl text-white lg:hidden">
          IP Address Tracker
        </p>
        <img
          className="bg-cover w-full h-[300px] lg:h-auto"
          src={backgroundImg}
          alt="background"
        />
        <div class="absolute inset-0 lg:mb-36 lx:mb-52 flex items-center justify-center">
          <p class="text-white text-2xl font-[500] sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl">
            IP Address Tracker
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center lg:mb-10 xl:mb-8">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for any IP address or domain"
            className=" rounded-l-2xl p-4 w-[250px] lg:w-[500px] m-0 outline-none"
            onChange={hundleInputChange}
          />
          <button
            onClick={submitBtn}
            className="bg-[#000] rounded-r-2xl m-0 p-4 w-[50px] hover:bg-[#2b2b2b] active:bg-[grey]"
          >
            <i class="btn fa-solid fa-caret-up fa-rotate-90 fa-lg"></i>
          </button>
        </div>
      </div>

      {/* content shows here 👇 */}
      <div
        className="flex flex-col lg:flex-row lg:justify-around bg-[#fff] p-4 lg:p-4  justify-center inset-0 lg:top-[9em] xl:top-[13em] absolute top-[13rem] max-w-[300px] lg:max-w-[1200px] mx-auto  rounded-2xl h-[330px] lg:max-h-32 z-10 shadow-xl
        "
      >
        <div className=" lg:border-b-0 lg:border-r-2  pb-2 lg:p-8 pt-4 lg:pt-2 border-gray-300">
          <p className="text-[0.7rem] text-[#9E9FA5] flex justify-center">
            IP ADDRESS
          </p>
          <div>
            {error ? (
              <p>Error: Failed to retrieve IP address</p>
            ) : (
              <p className="text-xl lg:text-2xl font-medium flex justify-center lg:justify-left">
                {data && data.ip}
              </p>
            )}
          </div>
        </div>
        <div className=" lg:border-b-0 lg:border-r-2 pb-2 lg:p-8 pt-4 lg:pt-2 border-gray-300">
          <p className="text-[0.7rem] text-[#9E9FA5] flex justify-center lg:justify-left">
            LOCATION
          </p>
          <div>
            {data && data.location ? (
              <p className="text-xl lg:text-2xl font-medium flex justify-center lg:justify-left">
                {data.location.country}
              </p>
            ) : (
              <p>Loading...</p>
            )}

            {data && data.location ? (
              <p className="text-xl lg:text-2xl font-medium flex justify-center lg:justify-left">
                {data.location.city}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className=" lg:border-b-0 lg:border-r-2 pb-2 lg:p-8 pt-4 lg:pt-2 border-gray-300">
          <p className="text-[0.7rem] text-[#9E9FA5] flex justify-center lg:justify-left">
            TIME ZONE
          </p>
          <div>
            {data && data.location ? (
              <p className="text-xl lg:text-2xl font-medium flex justify-center lg:justify-left">
                {data.location.timezone}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="lg:pl-8 pt-2">
          {" "}
          <p className="text-[0.7rem] text-[#9E9FA5] flex justify-center lg:justify-left">
            ISP
          </p>
          <div>
            {error ? (
              <p>Error: Failed to retrieve ISP</p>
            ) : (
              <p className="text-xl lg:text-2xl font-medium flex justify-center lg:justify-left">
                {data?.isp}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="relative  z-0 ">
        {data && data.location && data.location.lat && data.location.lng && (
          <MapContainer
            center={[data.location.lat, data.location.lng]}
            zoom={13}
            key={refreshMap}
          >
            <TileLayer
              attribution="https://www.openstreetmap.org/copyright"
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={markers[0].geocode} icon={customIcon}></Marker>
          </MapContainer>
        )}
      </div>
      <footer className="h-[50px] flex justify-center bg-[#FFF]">
        <p className="mt-3 text-sm">
          Coded by{" "}
          <a href="www.waris-alokozay.netlify.app">
            <strong>Waris Alokozay</strong> All Rights Reserved ©️ 2023
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
