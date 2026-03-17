import { createReducer } from '@reduxjs/toolkit';
import { setOffers, selectCity, setSortType, setActiveOfferId } from './action';
import { Offer } from '../types/offer.type';
import { SORT_TYPES } from '../settings';
import { SortType } from '../enums';

const initialState: { city: string; offers: Offer[]; sortType: SortType; activeOfferId: number | null } = {
  city: '',
  offers: [],
  sortType: SORT_TYPES[0],
  activeOfferId: null,
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
    })
    .addCase(setActiveOfferId, (state, action) => {
      state.activeOfferId = action.payload;
    });
});

export {reducer};
