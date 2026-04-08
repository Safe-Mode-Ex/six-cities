import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils';
import { getFakeOffers } from '../../utils';
import FavoritesLocation from './favorites-location';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types';

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
