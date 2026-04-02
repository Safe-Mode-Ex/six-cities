import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import { withHistory } from '../../utils/mock-component';
import Places from './places';
import { getFakeOffers } from '../../utils/mocks';

vi.mock('../../hooks/use-app-selector', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Places', () => {
  const placesContainerTestId = 'places-container';
  const expectedCityName = CITIES[0];

  it('should render properly', () => {
    const noPlacesStatusText = /No places to stay available/i;
    const noPlacesStatusDesc = /We could not find any property available at the moment in /i;
    const preparedComponent = withHistory(
      <Places
        activeCityName={expectedCityName}
        cityOffers={[]}
      />);

    render(preparedComponent);
    const placesContainer = screen.getByTestId(placesContainerTestId);

    expect(placesContainer).toBeInTheDocument();
    expect(placesContainer).toHaveClass('cities__places-container--empty');
    expect(screen.getByText(noPlacesStatusText)).toBeInTheDocument();
    expect(screen.getByText(noPlacesStatusDesc)).toBeInTheDocument();
  });

  it('should render Offers and Map components if cityOffers is not empty', () => {
    const expectedText = 'Places';
    const mapContainerTestId = 'map-container';
    const offersMock = getFakeOffers();
    const preparedComponent = withHistory(
      <Places activeCityName={expectedCityName} cityOffers={offersMock} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(mapContainerTestId)).toBeInTheDocument();
  });
});
