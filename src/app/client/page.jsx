"use client";

import { useEffect, useRef, useState } from 'react';
import MapWrapper from '@/components/MapWrapper';
import get_socketio from '@/libs/io/getIoConnection';

const ClientPage = () => {
    const conn = useRef(null);
    const [position, setPosition] = useState(null);
    useEffect(() => {
        conn.current = get_socketio()
        conn.current.on("receive_location", (resData) => {
            const data = JSON.parse(resData)
            setPosition({
                lat: data.lat,
                lng: data.lng
            })
        })
        return () => conn.current.disconnect();
    }, []);

    return <>
        <MapWrapper positions={position ? [position] : []} />
    </>
}

export default ClientPage;