import get_socketio from "@/libs/io/getIoConnection";
import { useEffect, useRef } from "react";

const useGetDrivers = ({ setPositions, driverId = null }) => {
    const conn = useRef(null);

    useEffect(() => {
        conn.current = get_socketio();
        // Update positions when receiving driver location updates.
        conn.current.on("receive_location", (resData) => {
            const data = JSON.parse(resData);

            setPositions(prev => {
                if (driverId == data.driver.user.id)
                    return ({ ...prev })
                else
                    return ({
                        ...prev,
                        [data.driver.user.id]: {
                            lat: data.lat,
                            lng: data.lng,
                            sid: data.sid,
                            number: data.driver.user.car_number // store the driver's socket id (sid)
                        }
                    })
            });
        });
        // Remove drivers on disconnect.
        conn.current.on("driver_disconnect", (sid) => {
            setPositions(prev => {
                const updated = { ...prev };
                // Loop over your drivers to find the one with a matching sid.
                Object.keys(updated).forEach(driverId => {
                    if (updated[driverId].sid === sid) {
                        delete updated[driverId];
                    }
                });
                return updated;
            });
        });

        // Clean up our connection when the component unmounts.
        return () => conn.current.disconnect();
    }, [driverId]);
}

export default useGetDrivers;