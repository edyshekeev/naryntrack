"use client";

import { useGeolocation } from '@/hooks/useGeolocation';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

const ClientPage = () => {

    useEffect(() => {
        return () => {
            socket.off("location_update");
        };
    }, []);
    useGeolocation({
        init: () => {

            return;
        },
        callback: (lat, lng) => {
            socket.emit("send_location", { lat, lng })
        }
    })
    return <>

    </>
}

export default ClientPage;