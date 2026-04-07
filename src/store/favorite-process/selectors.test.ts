import { NameSpace } from '../../enums';
import { getGroupedByCityOffers } from '../../utils';
import { getFakeFavorite } from '../../utils';
import { selectFavorite, selectFavoriteOffersCount, selectIsFavoriteLoading } from './selectors';

describe('FavoriteProcess selectors', () => {
  const favoriteMock = getFakeFavorite();

  const state = {
    [NameSpace.Favorite]: {
      favorites: favoriteMock,
      isFavoriteLoading: true,
    }
  };

  it('should return favorite from state', () => {
    const { favorites } = state[NameSpace.Favorite];
    const expectedFavorite = getGroupedByCityOffers(favorites);
    const result = selectFavorite(state);
    expect(result).toEqual(expectedFavorite);
  });

  it('should return favorites loading status from state', () => {
    const { isFavoriteLoading } = state[NameSpace.Favorite];
    const result = selectIsFavoriteLoading(state);
    expect(result).toBe(isFavoriteLoading);
  });

  it('should return favorites count from favorites length', () => {
    const { favorites } = state[NameSpace.Favorite];
    const result = selectFavoriteOffersCount(state);
    expect(result).toBe(favorites.length);
  });
});
