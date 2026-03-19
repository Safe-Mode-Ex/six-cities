import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, selectCity, setSortType, setActiveOfferId, requireAuthorization, setOffersDataLoadingStatus } from './action';
import { SORT_TYPES } from '../settings';
import { AuthorizationStatus } from '../types/authorization-status';
import { AppState } from '../types/state';

const initialState: AppState = {
  city: '',
  offers: [],
  sortType: SORT_TYPES[0],
  activeOfferId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, ((state, action) => {
      state.offers = action.payload;
    }))
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
