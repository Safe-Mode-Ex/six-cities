import { State } from '../../types';
import { NameSpace, SortType } from '../../enums';
import { createSelector } from '@reduxjs/toolkit';

export const selectCityOffers = createSelector(
  [
    (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers],
    (_: State, currentCity: string) => currentCity,
  ],
  (state, currentCity) =>
    state.offers.filter(({ city }) => city.name === currentCity)
);


export const selectSortType = (state: Pick<State, NameSpace.Offers>): SortType =>
  state[NameSpace.Offers].sortType;

export const selectIsOffersDataLoading = (state: Pick<State, NameSpace.Offers>): boolean =>
  state[NameSpace.Offers].isOffersLoading;
