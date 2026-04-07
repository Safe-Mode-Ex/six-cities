import 'leaflet/dist/leaflet.css';
import { OfferLocation, OfferMapPoint } from '../../types/offer';
import { useRef } from 'react';
import styles from './map.module.css';
import cn from 'classnames';
import useMapMarkers from '../../hooks/use-map-markers/use-map-markers';
import useMap from '../../hooks/use-map/use-map';

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
      className={cn(
        'map',
        extraClass,
        styles.map
      )}
      ref={mapRef}
      data-testid="map-container"
    >
    </section>
  );
}

export default Map;
