import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import * as L from "leaflet";

import userData from "../assets/larbi_timeline.json";

function MapComponent(params) {
  const [position, setPosition] = React.useState([48.8043942, 2.3248217]);
  const [zoom, setZoom] = React.useState(19);
  const [tracePoints, setTracePoints] = React.useState([]);
  const [tracePolyline, setTracePolyline] = React.useState([]);

  const fillBlueOptions = { fillColor: "blue" };
  const blackOptions = { color: "black" };
  const limeOptions = { color: "lime" };
  const purpleOptions = { color: "purple" };
  const redOptions = { color: "red" };

  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
  });
  const greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=S|2ecc71&chf=a,s,ee00FFFF",
  });

  const redIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=E|ff0000&chf=a,s,ee00FFFF",
  });

  const getIcon = (index) => {
    if (index === 0) return greenIcon;
    else if (index === tracePolyline.length - 1) return redIcon;
    else return blueIcon;
  };

  React.useEffect(() => {
    let tempTracePoints = [];
    let tempTracePolyline = [];
    userData.map((element) => {
      if (element.metadata.key === "background/filtered_location") {
        tempTracePoints.push({
          position: [element.data.latitude, element.data.longitude],
          data: element.data,
        });
        tempTracePolyline.push([element.data.latitude, element.data.longitude]);
      }
    });
    setTracePoints(tempTracePoints);
    setTracePolyline(tempTracePolyline);
  }, []);

  return (
    <MapContainer
      center={tracePoints.length === 0 ? position : tracePoints[0].position}
      zoom={30}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline pathOptions={fillBlueOptions} positions={tracePolyline} />
      {tracePoints?.map((point, index) => (
        <Marker position={point.position} key={index} icon={getIcon(index)}>
          <Popup>
            {point.data.fmt_time} <br />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
