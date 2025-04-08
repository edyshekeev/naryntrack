"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper({ positions, isClient, innerComponent }) {
  return <Map className="h-full" isClient={isClient} positions={positions} innerComponent={innerComponent} />;
}