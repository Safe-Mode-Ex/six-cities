import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { OfferLocation } from '../types/offer';
import { Leaflet } from '../const';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: OfferLocation,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && location) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const tileLayer = new TileLayer(
        Leaflet.Template,
        {
          attribution: Leaflet.Attribution,
        },
      );

      instance.addLayer(tileLayer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}

export default useMap;
