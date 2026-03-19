import { Icon, layerGroup, Map, Marker } from 'leaflet';
import { useEffect } from 'react';
import { OfferMapPoint } from '../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../settings';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeCustomUrl = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function useMapMarkers(points: OfferMapPoint[], map: Map | null, activeOfferId: number | null): void {
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
  }, [activeOfferId, map, points]);
}

export default useMapMarkers;
