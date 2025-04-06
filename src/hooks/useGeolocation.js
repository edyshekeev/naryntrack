"use client";
import { useEffect } from "react";

export function useGeolocation({ callback = (lat, lng) => { }, init = () => { } }) {
  useEffect(() => {
    const close = init();
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        callback(latitude, longitude);
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );

    return () => {
      if (close)
        close();
      return navigator.geolocation.clearWatch(watchId)
    };
  }, [callback]);
}
