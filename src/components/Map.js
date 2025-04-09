"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "@/hooks/useGeolocation";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [41, 41],
});

const driverIcon = L.icon({
  iconUrl: "bus-icon-svgrepo-com.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "/leaflet/marker-shadow.png",
  shadowSize: [41, 41],
});

// Component to center map on user location
const SetViewToUser = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  return null;
};

const AutopositionButton = ({ onClick, isPointing }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow hover:bg-gray-100"
    >
      {isPointing ? "📍 Закрепить на мне" : "📍 Открепить от меня"}
    </button>
  );
};

const Map = ({ positions = [], isClient = false, innerComponent }) => {
  const [position, setPosition] = useState(null);
  const [isPointing, setIsPointing] = useState(false);
  const updateGelocation = (lat, lng) => {
    setPosition([lat, lng]);
  }
  useGeolocation({
    callback: updateGelocation
  });
  return (
    <div className="relative w-screen h-full">
      {innerComponent}
      <AutopositionButton isPointing={isPointing} onClick={() => setIsPointing(prev => !prev)} />
      <MapContainer
        center={position || [41.42692877099885, 75.98208390133429]}
        zoom={13}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {(position) && (
          <>
            {isPointing && <SetViewToUser position={position} />}
            <Marker key="current" position={position} icon={isClient ? customIcon : driverIcon}>
              <Popup>{isClient ? "Вы здесь" : "Вы едете здесь"}</Popup>
            </Marker>
          </>
        )}
        {positions?.length > 0 &&
          positions.map((pos, i) => (
            <Marker key={i} position={pos} icon={driverIcon}>
              <Popup>{pos.number}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
