import { Icon, layerGroup, Map, Marker } from 'leaflet';
import { useEffect } from 'react';
import { OfferLocation, OfferMapPoint } from '../types/offer';
import { MarkerUrl } from '../enums';

const defaultCustomIcon = new Icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeCustomUrl = new Icon({
  iconUrl: MarkerUrl.Active,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function useMapMarkers(
  { latitude, longitude, zoom }: OfferLocation,
  points: OfferMapPoint[],
  map: Map | null,
  activeOfferId: string | null
): void {
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach(({ id, location }) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(activeOfferId && id === activeOfferId ? activeCustomUrl : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [activeOfferId, latitude, longitude, map, points, zoom]);
}

export default useMapMarkers;
