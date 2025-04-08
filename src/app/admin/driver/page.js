"use client";

import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useRef, useState } from 'react';
import MapWrapper from '@/components/MapWrapper';
import get_socketio from '@/libs/io/getIoConnection';
import useGetDrivers from '@/hooks/useGetDrivers';
import { useGetMe } from '@/hooks/queries/useGetMe';

const DriverPage = () => {
    const conn = useRef(null);
    const { data: user, isLoading } = useGetMe();
    const [started, setStarted] = useState();
    const [positions, setPositions] = useState({});

    useGeolocation({
        init: () => {
            conn.current = get_socketio({
                token: localStorage.getItem("authToken")
            })
            return () => conn.current.disconnect();
        },
        callback: (lat, lng) => {
            conn.current.emit("send_location", JSON.stringify({ lat, lng }))
        },
        started
    })
    useGetDrivers({ setPositions, driverId: user?.id });

    return <>
        <MapWrapper positions={Object.values(positions)} innerComponent={
            <button
                className="absolute bottom-6 z-[1000] w-[80%] right-[50%] translate-x-1/2 -translate-y-1/2 border-2 bg-white px-4 py-2 rounded shadow-md hover:bg-gray-100"
                onClick={() => setStarted(prev => !prev)}
            >
                {started ? "Stop" : "Start"}
            </button>
        } />

    </>
}

export default DriverPage;