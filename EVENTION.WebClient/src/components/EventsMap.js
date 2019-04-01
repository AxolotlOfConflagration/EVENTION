import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
`;

class EventMap extends React.Component {
  componentDidMount() {
    this.map = L.map("map", {
      center: [52.406, 16.925],
      zoom: 13
    });

    L.tileLayer(
      "https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png",
      {
        maxZoom: 20
      }
    ).addTo(this.map);
  }

  render() {
    return <Wrapper width="100%" height="800px" id="map" />;
  }
}

export default EventMap;
