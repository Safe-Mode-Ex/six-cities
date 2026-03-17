import 'leaflet/dist/leaflet.css';
import { OfferMapPoint } from '../../types/offer.type';
import { useRef } from 'react';
import useMap from '../../hooks/use-map';
import useMapMarkers from '../../hooks/use-map-markers';

type MapProps = {
  mapTemplate: string;
  points: OfferMapPoint[];
  activeOfferId: number | null;
  extraClass?: string;
};

function Map({ mapTemplate, points, activeOfferId, extraClass }: MapProps): JSX.Element {
  const cityLocation = points[0].location;
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation, mapTemplate);

  useMapMarkers(points, map, activeOfferId);

  return (
    <section
      className={`${extraClass || ''} map`}
      ref={mapRef}
      style={{maxWidth: '1144px', marginLeft: 'auto', marginRight: 'auto'}}
    >
    </section>
  );
}

export default Map;
