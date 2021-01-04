import mapboxgl, { Map, Marker } from "mapbox-gl";
import { FunctionComponent, memo, useEffect, useRef } from "react";
import styled from "styled-components";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_TOKEN!;

interface Props {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  setLatitude?: (lat: number) => void;
  setLongitude?: (lat: number) => void;
  draggableMarker?: boolean;
}

const MapBox: FunctionComponent<Props> = ({
  latitude,
  longitude,
  zoom = 8,
  setLatitude,
  setLongitude,
  draggableMarker = true,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      const map: Map = new mapboxgl.Map({
        container: mapRef.current!,
        style: "mapbox://styles/mapbox/outdoors-v10?optimize=true", // optimize=true
        center: [longitude, latitude],
        minZoom: 3,
        maxZoom: 8,
        zoom,
      });

      const marker: Marker = new mapboxgl.Marker({
        draggable: draggableMarker,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      if (draggableMarker && setLatitude && setLongitude) {
        marker.on("dragend", (event: any) => {
          const latlng = event.target._lngLat;
          setLatitude(latlng.lat);
          setLongitude(latlng.lng);
        });
      }

      map.addControl(new mapboxgl.NavigationControl());
      return () => map.remove();
    }
  }, []);

  return <MapStyle ref={mapRef}></MapStyle>;
};

const MapStyle = styled.div`
  height: 100%;
`;

export default memo(MapBox);
