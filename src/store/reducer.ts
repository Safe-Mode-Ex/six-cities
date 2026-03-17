import { createReducer } from '@reduxjs/toolkit';
import { setOffers, selectCity, setSortType } from './action';
import { Offer } from '../types/offer.type';
import { SORT_TYPES } from '../settings';
import { SortType } from '../enums';

const initialState: { city: string; offers: Offer[]; sortType: SortType } = {
  city: '',
  offers: [],
  sortType: SORT_TYPES[0],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, ((state, action) => {
      state.offers = action.payload;
    }))
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    });
});

export {reducer};
