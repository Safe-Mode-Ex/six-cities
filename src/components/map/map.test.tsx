import { render, screen } from '@testing-library/react';
import Map from './map';

describe('Component: Map', () => {
  it('should render properly', () => {
    const expectedTestId = 'map-container';
    const activeOfferId = '1';
    const additionalClass = 'test-class';

    const location = {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    };

    const points = [
      {
        id: '1',
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 10,
        }
      },
      {
        id: '2',
        location: {
          latitude: 52.369553943508,
          longitude: 4.85309666406198,
          zoom: 10,
        }
      },
    ];

    render(
      <Map
        location={location}
        points={points}
        activeOfferId={activeOfferId}
        extraClass={additionalClass}
      />
    );
    const mapContainer = screen.getByTestId(expectedTestId);

    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveClass(additionalClass);
  });
});
