import { render, screen } from '@testing-library/react';
import { getFakeFavorite } from '../../utils';
import Favorites from './favorites';
import { Offer } from '../../types';
import { withHistory, withStore } from '../../utils';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types';

describe('Component: FavoritesComponent', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    }
  };

  it('shoud render properly', () => {
    const expectedText = /Saved listing/i;
    const favoritesListTestId = 'favorites-list';
    const favoriteEntries = [['Amsterdam', getFakeFavorite()] as [string, Offer[]]];
    const { withStoreComponent } = withStore(
      withHistory(<Favorites favoriteEntries={favoriteEntries} />),
      state,
    );

    render(withStoreComponent);

    expect((screen.getByText(expectedText))).toBeInTheDocument();
    expect(screen.getByTestId(favoritesListTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(favoriteEntries.length);
  });
});
