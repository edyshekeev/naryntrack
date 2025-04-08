"use client";

import { useEffect, useRef, useState } from 'react';
import MapWrapper from '@/components/MapWrapper';
import get_socketio from '@/libs/io/getIoConnection';

const ClientPage = () => {
    const conn = useRef(null);
    const [positions, setPositions] = useState({});

    useEffect(() => {
        conn.current = get_socketio();

        // Update positions when receiving driver location updates.
        conn.current.on("receive_location", (resData) => {
            const data = JSON.parse(resData);
            setPositions(prev => ({
                ...prev,
                [data.driver.user.id]: {
                    lat: data.lat,
                    lng: data.lng,
                    sid: data.sid,
                    number: data.driver.user.car_number // store the driver's socket id (sid)
                }
            }));
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
    }, []);
    return <MapWrapper positions={Object.values(positions)} />;
};

export default ClientPage;