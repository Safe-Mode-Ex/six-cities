import { State } from '../../types/app-state';
import { NameSpace, SortType } from '../../enums';
import { Offer } from '../../types/offer';

export const selectOffers = (state: Pick<State, NameSpace.Offers>): Offer[] =>
  state[NameSpace.Offers].offers;

export const selectSortType = (state: Pick<State, NameSpace.Offers>): SortType =>
  state[NameSpace.Offers].sortType;

export const selectIsOffersDataLoading = (state: Pick<State, NameSpace.Offers>): boolean =>
  state[NameSpace.Offers].isOffersLoading;
