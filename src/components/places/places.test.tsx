import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import Places from './places';
import { getFakeOffers } from '../../utils/mocks';
import { NameSpace, SortType } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';

describe('Component: Places', () => {
  const placesContainerTestId = 'places-container';
  const expectedCityName = CITIES[0];
  const state = {
    [NameSpace.Offers]: {
      offers: [],
      sortType: SortType.POPULAR,
      isOffersLoading: true,
    },
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
  };

  it('should render properly', () => {
    const noPlacesStatusText = /No places to stay available/i;
    const noPlacesStatusDesc = /We could not find any property available at the moment in /i;
    const { withStoreComponent } = withStore(
      withHistory(
        <Places
          activeCityName={expectedCityName}
          cityOffers={[]}
        />),
      state,
    );

    render(withStoreComponent);
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
    const { withStoreComponent } = withStore(
      withHistory(
        <Places activeCityName={expectedCityName} cityOffers={offersMock} />
      ),
      state,
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(mapContainerTestId)).toBeInTheDocument();
  });
});
