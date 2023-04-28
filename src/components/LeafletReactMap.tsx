import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Condition from "../interfaces/condition.interface";
import { LatLng, LatLngExpression } from "leaflet";
import useDebounce from "../hooks/useDebounce";
import ConditionMarker from "./CustomMarker";
import conditionService from "../services/conditionService";
import { SectorJson } from "../interfaces/apisectors.interface";
import filterConditionsService from "../services/filterConditionsService";
import groupConditionsByCop from "../services/groupConditionsService";

export default function LeafletReactMap() {
  const [center, setCenter] = useState<LatLngExpression>([50.026292, 8.765245]);
  const [zoom, setZoom] = useState<number>(8);

  const conditions: Condition[] = conditionService.getConditions();

  const [filteredConditions, setFilteredConditions] =
    useState<Record<string, Condition[]>>();
  const [filteredSectors, setFilteredSectors] = useState<Condition[]>([]);

  const [search, setSearch] = useState<string>("GIN");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (search === "") {
      setSearch("GIN");
    }
    const searchConditions = filterConditionsService(conditions, search);
    const groupedConditions = groupConditionsByCop(searchConditions);
    setFilteredConditions(groupedConditions);
  }, [debouncedSearch]);

  return (
    <>
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100vw", height: "100vh" }}
        maxZoom={10}
        minZoom={6}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {filteredConditions &&
          Object.entries(filteredConditions).map(([cop, conditions]) => (
            <>
              <ConditionMarker conditions={conditions} cop={cop} />
            </>
          ))}
      </MapContainer>
    </>
  );
}
