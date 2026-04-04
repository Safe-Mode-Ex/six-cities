import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../enums';
import { OffersState } from '../../types/app-state';
import { changeFavoriteStateAction, fetchOffersAction, logoutAction } from '../api-actions';
import { getDefaultSortTypes } from '../../utils/helpers';

const initialState: OffersState = {
  offers: [],
  sortType: getDefaultSortTypes()[0],
  isOffersLoading: true,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setOffersLoading: (state, action: PayloadAction<boolean>) => {
      state.isOffersLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(changeFavoriteStateAction.fulfilled, (state, action) => {
        const currentOffer = state.offers.find(({ id }) => id === action.payload.id);

        if (currentOffer) {
          currentOffer.isFavorite = action.payload.isFavorite;
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.offers.forEach((offer) => (offer.isFavorite = false));
      });
  },
});

export const { setSortType, setOffersLoading } = offersProcess.actions;
