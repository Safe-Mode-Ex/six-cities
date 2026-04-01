import { getFakeFavorite } from '../../utils/mocks';
import { fetchFavoriteOffersAction } from '../api-actions';
import { favoriteProcess } from './favorite-process';
import * as helpers from '../../utils/helpers';

describe('FavoriteProcess Slice', () => {
  it('should call getGroupedByCityOffers once changing state with fetchFavoriteOffersAction.fulfilled',
    () => {
      const favoriteOffers = [getFakeFavorite()[0]];
      const favorite = { [favoriteOffers[0].city.name]: favoriteOffers };
      const expectedState = {
        favorite,
        favoriteOffersCount: favoriteOffers.length,
        isFavoriteLoading: false,
      };
      const mockGetGroupedByCityOffers = vi.spyOn(helpers, 'getGroupedByCityOffers');

      const result = favoriteProcess
        .reducer(undefined, fetchFavoriteOffersAction.fulfilled(favoriteOffers, '', undefined));

      expect(mockGetGroupedByCityOffers).toBeCalledTimes(1);
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
