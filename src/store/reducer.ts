import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  selectCity,
  setSortType,
  requireAuthorization,
  setUser,
  loadOfferById,
  loadReviewsByOfferId,
  loadNearbyOffers,
  setReviewForm
} from './action';
import { fetchOfferByIdAction, fetchOffersAction, sendOfferReview } from './api-actions';
import { initialState } from './const';

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, ((state, action) => {
      state.offers = action.payload;
    }))
    .addCase(fetchOffersAction.pending, ((state) => {
      state.isOffersDataLoading = true;
    }))
    .addCase(fetchOffersAction.fulfilled, ((state) => {
      state.isOffersDataLoading = false;
    }))
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
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
    .addCase(fetchOfferByIdAction.pending, (state) => {
      state.isOffersDataLoading = true;
    })
    .addCase(fetchOfferByIdAction.fulfilled, (state) => {
      state.isOffersDataLoading = false;
    })
    .addCase(fetchOfferByIdAction.rejected, (state) => {
      state.isOffersDataLoading = false;
    })
    .addCase(loadReviewsByOfferId, (state, action) => {
      state.offerReviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(sendOfferReview.pending, (state) => {
      state.isCommentSending = true;
    })
    .addCase(sendOfferReview.fulfilled, (state) => {
      state.isCommentSending = false;
    })
    .addCase(sendOfferReview.rejected, (state) => {
      state.isCommentSending = false;
    })
    .addCase(setReviewForm, (state, action) => {
      state.reviewForm = action.payload;
    });
});

export {reducer};
