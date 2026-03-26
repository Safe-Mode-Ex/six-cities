import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { OfferDetailsState } from '../../types/app-state';
import { changeFavoriteStateAction, fetchCommentsAction, fetchNearbyOffers, fetchOfferByIdAction, logoutAction } from '../api-actions';
import { OfferDetails } from '../../types/offer';

const initialState: OfferDetailsState = {
  offerDetails: null,
  offerReviews: [],
  nearbyOffers: [],
};

export const offerSlice = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {
    setOfferDetails: (state, action: PayloadAction<OfferDetails | null>) => {
      state.offerDetails = action.payload;
    }
  },
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
      })
      .addCase(changeFavoriteStateAction.fulfilled, (state, action) => {
        if (state.offerDetails) {
          state.offerDetails.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(logoutAction.pending, (state) => {
        if (state.offerDetails) {
          state.offerDetails.isFavorite = false;
        }
      });
  },
});

export const { setOfferDetails } = offerSlice.actions;
