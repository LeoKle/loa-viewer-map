import conditionsData from "../data/conditions.json";
import Condition from "../interfaces/condition.interface";
import waypointsData from "../data/waypoints.json";
import Waypoint from "../interfaces/waypoint.interface";
import coordinates from "../utils/coordinates";
import L, { LatLngExpression } from "leaflet";

// server does not allow API get requests due to CORS policy, using static json to simulate API responses
// async function getConditions() {
//     try {
//         const response = await axios.get('https://loa.vatsim-germany.org/api/v1/conditions')
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

function getConditions() {
  const conditions = conditionsData as Condition[];
  return conditions;
}

function getCoordinates(name: string) {
  const waypoints = waypointsData as Waypoint[];
  const waypoint = waypoints.find((waypoint) => waypoint.name === name);

  if (waypoint === undefined) {
    return undefined;
  }

  const latitude = coordinates.convertLatitudeToNumber(waypoint.LAT);
  const longitude = coordinates.convertLongitudeToNumber(waypoint.LONG);

  return [latitude, longitude] as LatLngExpression;
}

export default {
  getConditions,
  getCoordinates,
};
