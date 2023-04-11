import React from "react";
import * as L from "leaflet";

import "leaflet/dist/leaflet.css";

interface MapWidgetProps {
  center: [number, number];
  zoom: number;
}

export class MapWidget extends React.Component<MapWidgetProps> {
  private mapRef: React.RefObject<HTMLDivElement>;
  private map: L.Map | null = null;

  constructor(props: MapWidgetProps) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    if (this.mapRef.current && !this.map) {
      this.map = L.map(this.mapRef.current, {
        maxZoom: 10,
        minZoom: 6,
      }).setView(this.props.center, this.props.zoom);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(this.map);
    }
  }

  render() {
    return <div ref={this.mapRef} style={{ width: "100%", height: "100vh" }} />;
    return (
      <>
        <div style={{ width: "100%", height: "100vh" }}>
          <div id="search-container">
            <Navbar
              onSelectOption={(option: string): void => {
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
