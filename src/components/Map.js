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

const Map = () => {
  const [position, setPosition] = useState(null);

  useGeolocation({
    callback:
      (lat, lng) => {
        setPosition([lat, lng]);
      }
  });

  return (
    <div className="w-screen h-screen">
      <MapContainer
        center={position || [41.42692877099885, 75.98208390133429]} // Default center
        zoom={13}
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {position && (
          <>
            <SetViewToUser position={position} />
            <Marker position={position} icon={customIcon}>
              <Popup>You are here</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
