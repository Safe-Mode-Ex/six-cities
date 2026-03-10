import 'leaflet/dist/leaflet.css';
import { OfferMapPoint } from '../../types/offer.type';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { Icon, layerGroup, Marker } from 'leaflet';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../settings';

type MapProps = {
  mapTemplate: string;
  points: OfferMapPoint[];
  activeOfferId?: number | null;
};

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

function Map({ mapTemplate, points, activeOfferId = null }: MapProps): JSX.Element {
  const cityLocation = points[0].location;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation, mapTemplate);

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

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
