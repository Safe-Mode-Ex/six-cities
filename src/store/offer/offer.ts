import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { OfferDetailsState } from '../../types/app-state';
import { fetchCommentsAction, fetchNearbyOffers, fetchOfferByIdAction } from '../api-actions';

const initialState: OfferDetailsState = {
  offerDetails: null,
  offerReviews: [],
  nearbyOffers: [],
};

export const offer = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offerDetails = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.offerReviews = action.payload;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});
