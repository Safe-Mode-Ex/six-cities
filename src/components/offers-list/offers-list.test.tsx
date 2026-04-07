import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { getFakeOffers } from '../../utils/mocks';
import OffersList from './offers-list';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';

describe('Component: OffersList', () => {
  const offersListTestId = 'offers-list';
  const offersMock = getFakeOffers();
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    }
  };

  it('should render properly', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OffersList offers={offersMock} />),
      state,
    );

    render(withStoreComponent);

    expect(screen.getByTestId(offersListTestId)).toBeInTheDocument();
  });

  it('should have class favorites__places if isFavoriteScreen is true', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OffersList offers={offersMock} isFavoritesScreen />),
      state,
    );

    render(withStoreComponent);
    const offersListEl = screen.getByTestId(offersListTestId);

    expect(offersListEl).toHaveClass('favorites__places');
  });

  it('should have class places__list if isOfferScreen is true', () => {
    const { withStoreComponent } = withStore(
      withHistory(<OffersList offers={offersMock} isOfferScreen />),
      state,
    );

    render(withStoreComponent);
    const offersListEl = screen.getByTestId(offersListTestId);

    expect(offersListEl).toHaveClass('near-places__list');
  });
});
