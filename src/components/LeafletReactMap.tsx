import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Condition from "../interfaces/condition.interface";
import useDebounce from "../hooks/useDebounce";
import ConditionMarker from "./CustomMarker";
import conditionService from "../services/conditionService";
import filterConditionsService from "../services/filterConditionsService";
import groupConditionsByCop from "../services/groupConditionsService";
import { InputText } from "primereact/inputtext";

export default function LeafletReactMap() {
  const conditions: Condition[] = conditionService.getConditions();

  const [filteredConditions, setFilteredConditions] =
    useState<Record<string, Condition[]>>();
  const [filteredSectors, setFilteredSectors] = useState<Condition[]>([]);

  const [search, setSearch] = useState<string>("GIN");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const searchConditions = filterConditionsService(conditions, search);
    const groupedConditions = groupConditionsByCop(searchConditions);
    setFilteredConditions(groupedConditions);
  }, [debouncedSearch]);

  useEffect(() => {
    // set default search if nothing is inputted
    if (search === "") {
      setSearch("GIN");
    }
  }, [search]);

  return (
    <>
      <div style={{ position: "relative" }}>
        <InputText
          type="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        />
        <MapContainer
          center={[50.026292, 8.765245]}
          zoom={8}
          style={{ width: "100vw", height: "100vh", zIndex: 0 }}
          maxZoom={10}
          minZoom={6}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {filteredConditions &&
            Object.entries(filteredConditions).map(([cop, conditions]) => (
              <>
                <ConditionMarker conditions={conditions} cop={cop} />
              </>
            ))}
        </MapContainer>
      </div>
    </>
  );
}
