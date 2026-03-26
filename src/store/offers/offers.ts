import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../enums';
import { OffersState } from '../../types/app-state';
import { fetchOffersAction } from '../api-actions';
import { getDefaultSortTypes } from '../../helpers';

const initialState: OffersState = {
  city: '',
  offers: [],
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
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
      });
  },
});

export const { selectCity, setSortType } = offers.actions;
