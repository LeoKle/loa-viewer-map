import Condition from "../interfaces/condition.interface";
import { DivIcon, Icon, LatLngLiteral, LatLngTuple } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import conditionService from "../services/conditionService";
import { Marker, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import location from "../img/location.png";

interface PropsMarker {
  cop: string;
  conditions: Condition[];
}

interface PropsTable {
  cop: string;
  conditions: Condition[];
  zoom: number;
}

function ConditionTableIcon({ cop, conditions, zoom }: PropsTable) {
  const tableStyle = {
    fontSize: zoom + 2,
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th className="center" colSpan={5} />
          <th className="center line" colSpan={2}>
            Sector
          </th>
          <th className="center line " colSpan={2}>
            FIR
          </th>
        </tr>
        <tr>
          <th className="line">AD</th>
          <th className="line">COP</th>
          <th className="line">Level</th>
          <th className="line">XC</th>
          <th className="line">Special Conditions</th>
          <th className="line">From</th>
          <th className="line">To</th>
          <th className="line">From</th>
          <th className="line">To</th>
        </tr>
      </thead>
      <tbody>
        {conditions.map((condition, index) => (
          <tr key={index}>
            <td className="line">
              {condition.adep_ades === "ADEP"
                ? "\u2191"
                : condition.adep_ades === "ADES"
                ? "\u2193"
                : ""}{" "}
              {condition.aerodrome}
            </td>
            <td className="line">{condition.cop}</td>
            <td className="line">
              {condition.feet ? "A" : "FL"}
              {condition.level}{" "}
            </td>
            <td className="line">{condition.xc}</td>
            <td className="line">{condition.special_conditions}</td>
            <td className="line">{condition.from_sector}</td>
            <td className="line">{condition.to_sector}</td>
            <td className="line">{condition.from_fir}</td>
            <td className="line">{condition.to_fir}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ConditionMarker({ cop, conditions }: PropsMarker) {
  const map = useMap();
  const [zoom, setZoom] = useState<number>(map.getZoom());
  const [Table, setTable] = useState<DivIcon>();
  const [MarkerIcon, setMarkerIcon] = useState<Icon>();
  const [copCoords, setCopCoords] = useState<
    LatLngLiteral | LatLngTuple | undefined
  >([0, 0]);

  useMapEvent("zoomend", () => {
    setZoom(map.getZoom());
  });

  useEffect(() => {
    setTable(
      new DivIcon({
        className: "custom-icon",
        html: renderToStaticMarkup(
          <ConditionTableIcon cop={cop} conditions={conditions} zoom={zoom} />
        ),
      })
    );

    const IconSize = zoom + 5;

    setMarkerIcon(
      new Icon({
        iconUrl: location,
        iconSize: [IconSize, IconSize],
      })
    );

    setCopCoords(conditionService.getCoordinates(cop));
  }, [zoom, cop, conditions]);

  return (
    <>
      {copCoords && Table && (
        <>
          <Marker position={copCoords} icon={MarkerIcon} />
          <Marker position={copCoords} icon={Table} />
        </>
      )}
    </>
  );
}

export default ConditionMarker;
