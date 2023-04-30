import Condition from "../interfaces/condition.interface";
import { DivIcon, Icon, LatLngLiteral, LatLngTuple } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import conditionService from "../services/conditionService";
import { Marker, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import ArrowWhite from "../img/location.png";

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
          <th>AD</th>
          <th>COP</th>
          <th>Level</th>
          <th>XC</th>
          <th>Special Conditions</th>
          <th>From Sector</th>
          <th>To Sector</th>
          <th>From FIR</th>
          <th>To FIR</th>
        </tr>
      </thead>
      <tbody>
        {conditions.map((condition, index) => (
          <tr key={index}>
            <td>
              {condition.adep_ades === "ADEP"
                ? "\u2191"
                : condition.adep_ades === "ADES"
                ? "\u2193"
                : ""}{" "}
              {condition.aerodrome}
            </td>
            <td>{condition.cop}</td>
            <td>
              {condition.feet ? "A" : "FL"}
              {condition.level}{" "}
            </td>
            <td>{condition.xc}</td>
            <td>{condition.special_conditions}</td>
            <td>{condition.from_sector}</td>
            <td>{condition.to_sector}</td>
            <td>{condition.from_fir}</td>
            <td>{condition.to_fir}</td>
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
        iconUrl: ArrowWhite,
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
