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
  {latitude, longitude}: OfferLocation,
  points: OfferMapPoint[],
  map: Map | null,
  activeOfferId: string | null
): void {
  useEffect(() => {
    if (map) {
      const pannedMap = map.flyTo([latitude, longitude]);
      const markerLayer = layerGroup().addTo(pannedMap);

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
        pannedMap.removeLayer(markerLayer);
      };
    }
  }, [activeOfferId, latitude, longitude, map, points]);
}

export default useMapMarkers;
