import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../types/state';

export const getAuthorizationStatus = createSelector(
  (state: AppState) => state,
  (state) => state.authorizationStatus
);

export const getIsOffersDataLoading = createSelector(
  (state: AppState) => state,
  (state) => state.isOffersDataLoading
);

export const getOffers = createSelector(
  (state: AppState) => state,
  (state) => state.offers
);

export const getUser = createSelector(
  (state: AppState) => state,
  (state) => state.user
);

export const getSortType = createSelector(
  (state: AppState) => state,
  (state) => state.sortType
);

export const getCity = createSelector(
  (state: AppState) => state,
  (state) => state.city
);

export const getOfferDetails = createSelector(
  (state: AppState) => state,
  (state) => state.offerDetails
);

export const getOfferReviews = createSelector(
  (state: AppState) => state,
  (state) => state.offerReviews
);

export const getNearbyOffers = createSelector(
  (state: AppState) => state,
  (state) => state.nearbyOffers
);
