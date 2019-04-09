import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
`;

const citiesPos = [
  {
    cityName: "Poznań",
    coords: [52.406, 16.925]
  },
  {
    cityName: "Warszawa",
    coords: [52.2297, 21.0122]
  },
  {
    cityName: "Wrocław",
    coords: [51.1079, 17.0385]
  },
  {
    cityName: "Trojmiasto",
    coords: [54.433, 18.55]
  },
  {
    cityName: "Kraków",
    coords: [50.0647, 19.945]
  },
  {
    cityName: "Zakopane",
    coords: [49.2992, 19.9496]
  }
];

class EventMap extends React.Component {
  setMap = mapPos => {
    citiesPos.forEach(city => {
      console.log(city);
      if (city.cityName === this.props.mapPos) {
        this.map.flyTo(city.coords, 13);
      }
    });
  };

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

  componentDidUpdate() {
    this.setMap(this.props.mapPos);
  }

  render() {
    return <Wrapper width="100%" height="800px" id="map" />;
  }
}

export default EventMap;
