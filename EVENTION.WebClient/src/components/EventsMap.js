import React from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  width: ${props => props.width}
  height: ${props => props.height}
`;

const customMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

const citiesPos = [
  {
    cityName: null,
    coords: [51.9194, 19.1451],
    zoom: 6
  },
  {
    cityName: "Poznan",
    coords: [52.406, 16.925],
    zoom: 12
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
      if (city.cityName === this.props.mapPos) {
        this.map.flyTo(city.coords, city.zoom, { duration: 1.5 });
      }
    });
  };

  setGeoMarker = () => {
    this.map.removeLayer(this.markerGroup);
    this.markerGroup = L.layerGroup().addTo(this.map);
    if (this.props.city !== null) {
      axios
        .post("http://localhost:9000/event", {
          beginning: (this.props.page - 1) * 4,
          count: 4,
          ordered: "creationDate",
          ascending: false,
          categories: this.props.categories,
          city: this.props.city
        })
        .then(res => {
          res.data.forEach(event => {
            console.log(event);
            if (event.event.geoJson) {
              this.marker = L.geoJSON(JSON.parse(event.event.geoJson), {
                pointToLayer: (feature, latlng) => {
                  return L.marker(latlng, { icon: customMarker });
                }
              })
                .bindPopup(
                  '<img height=75 alt="logo" src="' +
                    event.event.imageSource +
                    '"} /> <br>' +
                    event.event.name
                )
                .addTo(this.markerGroup);
            }
          });
        });
    }
  };

  componentDidMount() {
    this.map = L.map("map", {
      center: [51.9194, 19.1451],
      zoom: 6
    });

    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        id: "mapbox.streets"
      }
    ).addTo(this.map);
    this.markerGroup = L.layerGroup().addTo(this.map);
    this.setGeoMarker();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setMap();
      this.setGeoMarker();
    }
  }

  render() {
    return <Wrapper width="100%" height={"800px"} id="map" />;
  }
}

export default EventMap;
