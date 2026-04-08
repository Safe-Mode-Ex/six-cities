import { renderHook } from '@testing-library/react';
import useMap from './use-map';

describe('Hook: useMap', () => {
  it('should initialize the map and return the map instance', () => {
    const mapEl = document.createElement('div');
    mapEl.setAttribute('id', 'map');
    document.body.appendChild(mapEl);
    const mapRef = { current: mapEl } as unknown as React.RefObject<HTMLDivElement>;
    const location = { latitude: 0, longitude: 0, zoom: 10 };

    const { result } = renderHook(() => useMap(mapRef, location));
    const map = result.current;

    expect(map).not.toBeNull();
    expect(map?.getCenter().lat).toBe(location.latitude);
    expect(map?.getCenter().lng).toBe(location.longitude);
    expect(map?.getZoom()).toBe(location.zoom);
  });
});
