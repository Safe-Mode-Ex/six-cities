import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import { NameSpace } from '../../enums';

export const getOffers = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state,
  (state) => state[NameSpace.Offers].offers
);

export const getSortType = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state,
  (state) => state[NameSpace.Offers].sortType
);

export const getIsOffersDataLoading = createSelector(
  (state: Pick<State, NameSpace.Offers>) => state,
  (state) => state[NameSpace.Offers].isOffersLoading
);
