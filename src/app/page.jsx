"use client";

import { useState } from 'react';
import MapWrapper from '@/components/MapWrapper';
import useGetDrivers from '@/hooks/useGetDrivers';

const ClientPage = () => {
    const [positions, setPositions] = useState({});

    useGetDrivers({ setPositions });
    return <main className='h-screen'>
        <MapWrapper isClient positions={Object.values(positions)} />
    </main>
};

export default ClientPage;