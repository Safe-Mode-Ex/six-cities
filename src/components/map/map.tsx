import 'leaflet/dist/leaflet.css';
import { OfferLocation, OfferMapPoint } from '../../types/offer';
import { useRef } from 'react';
import useMap from '../../hooks/use-map';
import useMapMarkers from '../../hooks/use-map-markers';

type MapProps = {
  location: OfferLocation;
  points: OfferMapPoint[];
  activeOfferId: string | null;
  extraClass?: string;
};

function Map({ location, points, activeOfferId, extraClass }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useMapMarkers(location, points, map, activeOfferId);

  return (
    <section
      className={`${extraClass || ''} map`}
      ref={mapRef}
      style={{maxWidth: '1144px', marginLeft: 'auto', marginRight: 'auto'}}
      data-testid="map-container"
    >
    </section>
  );
}

export default Map;
