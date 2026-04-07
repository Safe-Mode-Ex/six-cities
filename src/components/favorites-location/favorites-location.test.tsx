import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { getFakeOffers } from '../../utils/mocks';
import FavoritesLocation from './favorites-location';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';

describe('Component: FavoritesLocation', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    },
  };

  it('should render properly', () => {
    const expectedText = 'Amsterdam';
    const offersMock = getFakeOffers();
    const { withStoreComponent } = withStore(
      withHistory(<FavoritesLocation city={expectedText} offers={offersMock} />),
      state,
    );

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
