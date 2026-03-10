import 'leaflet/dist/leaflet.css';
import { Offer, OfferCity } from '../../types/offer.type';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';
import { Icon, layerGroup, Marker } from 'leaflet';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../settings';

type MapProps = {
  mapTemplate: string;
  points: (OfferCity & { id: number })[];
  activeOffer?: Offer;
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

function Map({ mapTemplate, points, activeOffer }: MapProps): JSX.Element {
  const city = points[0];
  const mapRef = useRef(null);
  const map = useMap(mapRef, city, mapTemplate);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach(({ id, location }) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(activeOffer?.id && id === activeOffer.id ? activeCustomUrl : defaultCustomIcon)
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [activeOffer?.id, activeOffer?.city.name, map, points]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
