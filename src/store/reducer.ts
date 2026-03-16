import { createReducer } from '@reduxjs/toolkit';
import { setOffers, selectCity } from './action';
import { Offer } from '../types/offer.type';

const initialState: { city: string; offers: Offer[] } = {
  city: '',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, ((state, action) => {
      state.offers = action.payload;
    }));
});

export {reducer};
