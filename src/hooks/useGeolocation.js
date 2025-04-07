"use client";
import { useEffect } from "react";

export function useGeolocation({
  callback = (lat, lng) => { },
  init = () => { },
}) {
  useEffect(() => {
    const close = init();
    let watchId;

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const sendUpdate = (latitude, longitude) => {
      callback(latitude, longitude);
    };

    // Start watching for location changes
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        sendUpdate(latitude, longitude);
      },
      (error) => console.error("Error watching location:", error),
      { enableHighAccuracy: true }
    );

    return () => {
      if (close) close();
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [callback]);
}
