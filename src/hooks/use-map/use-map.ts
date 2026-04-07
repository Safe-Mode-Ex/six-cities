import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { OfferLocation } from '../../types';
import { Leaflet } from '../../enums';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: OfferLocation,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current && !isRenderedRef.current) {
      const instance = new Map(mapRef.current);

      const tileLayer = new TileLayer(
        Leaflet.Template,
        { attribution: Leaflet.Attribution },
      );

      instance.addLayer(tileLayer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef]);

  useEffect(() => {
    if (location && map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [location, map]);

  return map;
}

export default useMap;
