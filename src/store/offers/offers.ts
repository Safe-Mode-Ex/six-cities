import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../enums';
import { OffersState } from '../../types/app-state';
import { changeFavoriteStateAction, fetchOffersAction } from '../api-actions';
import { getDefaultSortTypes } from '../../helpers';

const initialState: OffersState = {
  city: '',
  offers: [],
  sortType: getDefaultSortTypes()[0],
  isOffersLoading: false,
};

export const offersSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    }
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
      .addCase(changeFavoriteStateAction.fulfilled, (state, action) => {
        const currentOffer = state.offers.find(({ id }) => id === action.payload.id);

        if (currentOffer) {
          currentOffer.isFavorite = action.payload.isFavorite;
        }
      });
  },
});

export const { selectCity, setSortType } = offersSlice.actions;
