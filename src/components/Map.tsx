import React from "react";
import * as L from "leaflet";

import "leaflet/dist/leaflet.css";
import { Navbar } from "./NavBar";
import conditionService from "../services/conditionService";
import Condition from "../interfaces/condition.interface";

import arrow from "../img/ArrowWhite.png";

interface MapWidgetProps {
  center: [number, number];
  zoom: number;
}

interface MapWidgetState {
  center: [number, number];
  zoom: number;
}

export class MapWidget extends React.Component<MapWidgetProps, MapWidgetState> {
  private mapRef: React.RefObject<HTMLDivElement>;
  private map: L.Map | null = null;
  private arrowLayer: L.LayerGroup | null = null;

  constructor(props: MapWidgetProps) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      center: props.center,
      zoom: props.zoom,
    };
  }

  componentDidMount() {
    if (this.mapRef.current && !this.map) {
      this.map = L.map(this.mapRef.current, {
        maxZoom: 10,
        minZoom: 6,
      }).setView(this.state.center, this.props.zoom);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(this.map);

      // Test: adding polylines to map
      this.arrowLayer = L.layerGroup().addTo(this.map);

      // const arrowLatLngs: L.LatLngExpression[] = [
      //   { lat: 50.02629, lng: 8.765245 },
      //   { lat: 50, lng: 8 },
      // ];
      // const arrowPolyline = L.polyline(arrowLatLngs, {
      //   color: "red",
      //   weight: 3,
      //   opacity: 0.5,
      // });
      // this.arrowLayer.addLayer(arrowPolyline);
      // test end

      // fetch data:
      const conditionsGroupedByCop = conditionService.groupConditionsByCop(
        conditionService.getConditions()
      );

      for (const [cop, conditions] of Object.entries(conditionsGroupedByCop)) {
        const copCoords = conditionService.getCoordinates(cop);
        if (copCoords === undefined) {
          continue;
        }

        // create widget
        let widget: string =
          "<div class='condition-main' style='text-align: center'>" +
          "<p>" +
          cop +
          "</p>" +
          "<br>" +
          "<div>" +
          "<table>" +
          "<th> AD </th>" +
          "<th> COP </th>" +
          "<th> Level </th>" +
          "<th> Special Conditions </th>" +
          "<th> From Sector </th>" +
          "<th> To Sector </th>";
        for (let i = 0; i < conditions.length; i++) {
          widget += "<tr>";

          widget += "<td>" + conditions[i].aerodrome + "</td>";
          widget += "<td>" + conditions[i].cop + "</td>";
          widget += "<td>" + conditions[i].level + "</td>";
          widget += "<td>" + conditions[i].special_conditions + "</td>";
          widget += "<td>" + conditions[i].from_sector + "</td>";
          widget += "<td>" + conditions[i].to_sector + "</td>";

          widget += "</tr>";
        }

        widget += "</table> </div> </div>";

        // add COP to map
        var copIcon = L.divIcon({
          className: "agreement-marker",
          html: widget,
        });
        const copMarker = L.marker(copCoords[0], {
          icon: copIcon,
        });
        this.arrowLayer.addLayer(copMarker);
      }
    }
  }

  componentDidUpdate(prevProps: MapWidgetProps) {
    if (prevProps.center !== this.props.center) {
      this.setState({ center: this.props.center });
      this.map?.setView(this.props.center, this.state.zoom);
    }
    if (prevProps.zoom !== this.props.zoom) {
      this.setState({ zoom: this.props.zoom });
      this.map?.setView(this.state.center, this.props.zoom);
    }
  }

  changeMapCenterAndZoom = (newCenter: [number, number], newZoom: number) => {
    this.setState({ center: newCenter }, () => {
      this.map?.setView(newCenter, newZoom);
    });
  };

  render() {
    return (
      <>
        <div style={{ width: "100%", height: "100vh" }}>
          <div id="search-container">
            <Navbar
              onSelectOption={(option: string): void => {
                if (option === "EDGG") {
                  this.changeMapCenterAndZoom([50.026292, 8.765245], 8);
                } else if (option === "EDWW") {
                  this.changeMapCenterAndZoom([52.96624, 10.590803], 8);
                } else {
                  this.changeMapCenterAndZoom([49.625007, 11.670821], 8);
                }
              }}
            />
          </div>
          <div ref={this.mapRef} style={{ width: "100%", height: "100%" }} />
        </div>
      </>
    );
  }
}
