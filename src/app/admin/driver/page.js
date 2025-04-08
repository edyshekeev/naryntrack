"use client";

import { useGeolocation } from '@/hooks/useGeolocation';
import { useEffect, useRef } from 'react';
import MapWrapper from '@/components/MapWrapper';
import get_socketio from '@/libs/io/getIoConnection';

const DriverPage = () => {
    const conn = useRef(null);
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
    })
    return <>
        <MapWrapper />
    </>
}

export default DriverPage;