import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet.heat";

function HeatmapLayer({ points = [], radius = 25, blur = 15, maxZoom = 17 }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const heatData = points.map((p) => [p.lat, p.lng, p.intensity || 0.5]);

    const heatLayer = window.L.heatLayer(heatData, {
      radius,
      blur,
      maxZoom,
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points, radius, blur, maxZoom]);

  return null;
}

export default HeatmapLayer;
