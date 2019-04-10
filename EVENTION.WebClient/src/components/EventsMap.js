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
    cityName: null,
    coords: [51.9194, 19.1451],
    zoom: 6
  },
  {
    cityName: "Poznan",
    coords: [52.406, 16.925],
    zoom: 13
  },
  {
    cityName: "Warszawa",
    coords: [52.2297, 21.0122],
    zoom: 13
  },
  {
    cityName: "Wroclaw",
    coords: [51.1079, 17.0385],
    zoom: 13
  },
  {
    cityName: "Trojmiasto",
    coords: [54.433, 18.55],
    zoom: 11
  },
  {
    cityName: "Krakow",
    coords: [50.0647, 19.945],
    zoom: 13
  },
  {
    cityName: "Zakopane",
    coords: [49.2992, 19.9496],
    zoom: 13
  }
];

class EventMap extends React.Component {
  setMap = () => {
    citiesPos.forEach(city => {
      console.log(city);
      if (city.cityName === this.props.mapPos) {
        this.map.flyTo(city.coords, city.zoom, { duration: 1.5 });
      }
    });
  };

  setMarkers = () => {
    this.marker = new L.Marker([52.406, 16.925]);
    this.marker.addTo(this.map);
  };

  componentDidMount() {
    this.map = L.map("map", {
      center: [52.406, 16.925],
      zoom: 13
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20
    }).addTo(this.map);
  }

  componentDidUpdate() {
    this.setMap();
    this.setMarkers();
  }

  render() {
    return <Wrapper width="100%" height="800px" id="map" />;
  }
}

export default EventMap;
