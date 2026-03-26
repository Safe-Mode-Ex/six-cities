import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import { NameSpace } from '../../enums';

export const getFavorite = createSelector(
  (state: Pick<State, NameSpace.Favorite>) => state,
  (state) => state[NameSpace.Favorite].favorite,
);

export const getFavoriteOffersCount = createSelector(
  (state: Pick<State, NameSpace.Favorite>) => state,
  (state) => state[NameSpace.Favorite].favoriteOffersCount,
);

export const getIsFavoriteLoading = createSelector(
  (state: Pick<State, NameSpace.Favorite>) => state,
  (state) => state[NameSpace.Favorite].isFavoriteLoading,
);
