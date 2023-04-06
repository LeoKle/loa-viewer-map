import React, {useState} from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyMap = () => {
    return (
        <MapContainer
            center={[51.163361, 10.447683]}
            zoom={7}
            style={{height: "100vh", width:"100vw"}}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
        </MapContainer>
    );
};

export default MyMap;