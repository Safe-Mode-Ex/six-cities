import { getFakeFavorite } from '../../utils';
import { fetchFavoriteOffersAction } from '../api-actions/api-actions';
import { favoriteProcess } from './favorite-process';

describe('FavoriteProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      isFavoriteLoading: false,
    };

    const result = favoriteProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favorites: [],
      isFavoriteLoading: false,
    };

    const result = favoriteProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set favorites with fetchFavoriteOffersAction.fulfilled',
    () => {
      const favoriteOffers = [getFakeFavorite()[0]];
      const expectedState = {
        favorites: favoriteOffers,
        isFavoriteLoading: false,
      };

      const result = favoriteProcess
        .reducer(undefined, fetchFavoriteOffersAction.fulfilled(favoriteOffers, '', undefined));

      expect(result).toEqual(expectedState);
    });

  it('should set isFavoriteLoading to true with fetchFavoriteOffersAction.pending', () => {
    const { isFavoriteLoading } = favoriteProcess.reducer(undefined, fetchFavoriteOffersAction.pending);

    expect(isFavoriteLoading).toBe(true);
  });

  it('should set isFavoriteLoading to false with fetchFavoriteOffersAction.rejected', () => {
    const { isFavoriteLoading } = favoriteProcess.reducer(undefined, fetchFavoriteOffersAction.rejected);

    expect(isFavoriteLoading).toBe(false);
  });
});
