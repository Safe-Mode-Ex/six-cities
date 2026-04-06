import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import { NameSpace } from '../../enums';
import { getGroupedByCityOffers } from '../../utils/helpers';

export const selectFavorite = createSelector(
  (state: Pick<State, NameSpace.Favorite>) => state.favorite,
  (state) => getGroupedByCityOffers(state.favorites),
);

export const selectIsFavoriteLoading = (state: Pick<State, NameSpace.Favorite>): boolean =>
  state[NameSpace.Favorite].isFavoriteLoading;

export const selectFavoriteOffersCount = (state: Pick<State, NameSpace.Favorite>): number =>
  state[NameSpace.Favorite].favorites.length;
