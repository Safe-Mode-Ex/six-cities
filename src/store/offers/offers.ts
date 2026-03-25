import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../enums';
import { OffersProcess } from '../../types/app-state';
import { fetchOffersAction } from '../api-actions';
import { getDefaultSortTypes } from '../../helpers';

const initialState: OffersProcess = {
  city: '',
  offers: [],
  isOffersDataLoading: false,
  sortType: getDefaultSortTypes()[0]
};

export const offers = createSlice({
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
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      });
  },
});

export const { selectCity, setSortType } = offers.actions;
