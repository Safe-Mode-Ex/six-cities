import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  selectCity,
  setSortType,
  setActiveOfferId,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setUser,
  loadOfferById,
  clearOfferDetails,
  loadReviewsByOfferId,
  clearOfferReviews,
  loadNearbyOffers,
  clearNearbyOffers
} from './action';
import { SORT_TYPES } from '../settings';
import { AuthorizationStatus } from '../types/authorization-status';
import { AppState } from '../types/state';

const initialState: AppState = {
  city: '',
  offers: [],
  sortType: SORT_TYPES[0],
  activeOfferId: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isOffersDataLoading: false,
  offerDetails: null,
  offerReviews: [],
  nearbyOffers: [],
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
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOfferById, (state, action) => {
      state.offerDetails = action.payload;
    })
    .addCase(clearOfferDetails, (state) => {
      state.offerDetails = null;
    })
    .addCase(loadReviewsByOfferId, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(clearOfferReviews, (state) => {
      state.offerReviews = [];
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearbyOffers = [];
    });
});

export {reducer};
