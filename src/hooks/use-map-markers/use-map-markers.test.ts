import { renderHook } from '@testing-library/react';
import useMapMarkers from './use-map-markers';
import useMap from '../use-map/use-map';

describe('Hook: useMapMarkers', () => {
  it('should add markers to the map', () => {
    const mapEl = document.createElement('div');
    mapEl.setAttribute('id', 'map');
    document.body.appendChild(mapEl);
    const mapRef = { current: mapEl } as unknown as React.RefObject<HTMLDivElement>;
    const location = { latitude: 0, longitude: 0, zoom: 10 };
    const points = [
      { id: '1', location: { latitude: 1, longitude: 1, zoom: 10 } },
      { id: '1', location: { latitude: 2, longitude: 2, zoom: 10 } },
    ];
    const activeOfferId = '1';

    const { result } = renderHook(() => useMap(mapRef, location));
    const map = result.current;
    renderHook(() => useMapMarkers(location, points, map, activeOfferId));

    const markerPane = map?.getPanes().markerPane;
    expect(markerPane?.children.length).toBe(points.length);
  });
});
