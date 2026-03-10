import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { OfferLocation } from '../types/offer.type';

const LEAFLET_ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  location: OfferLocation,
  mapTemplate: string
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      const tileLayer = new TileLayer(
        mapTemplate,
        {
          attribution: LEAFLET_ATTRIBUTION,
        },
      );

      instance.addLayer(tileLayer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location, mapTemplate]);

  return map;
}

export default useMap;
