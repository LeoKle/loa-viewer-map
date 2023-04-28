import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import Condition from "../interfaces/condition.interface";
import { DivIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import conditionService from "../services/conditionService";
import { Marker } from "react-leaflet";

interface Props {
  cop: string;
  conditions: Condition[];
}

function ConditionTableIcon({ cop, conditions }: Props) {
  return (
    <table>
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
            <td>{condition.level}</td>
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

function ConditionMarker({ cop, conditions }: Props) {
  const customIcon = new DivIcon({
    className: "custom-icon",
    html: renderToStaticMarkup(
      <ConditionTableIcon cop={cop} conditions={conditions} />
    ),
  });
  const copCoords = conditionService.getCoordinates(cop);

  return (
    <>{copCoords && <Marker position={copCoords} icon={customIcon}></Marker>}</>
  );
}

export default ConditionMarker;
