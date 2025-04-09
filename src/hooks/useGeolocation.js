"use client";
import { useEffect } from "react";

export function useGeolocation({
  callback = (lat, lng) => { },
  init = () => { },
  started = true
}) {
  useEffect(() => {
    if (started) {
      const close = init();

      if (!navigator.geolocation) {
        console.error("Этот браузер не поддерживает геолокацию");
        return;
      }

      const sendUpdate = (latitude, longitude) => {
        callback(latitude, longitude);
      };
      console.log("Смотреть геолокацию");

      // Start watching for location changes
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {

          const { latitude, longitude } = pos.coords;
          sendUpdate(latitude, longitude);
        },
        (error) => console.error("Ошибка при просмотре локации", error),
        { enableHighAccuracy: true }
      );

      return () => {
        if (close) close();
        if (watchId) navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [started]);
}
