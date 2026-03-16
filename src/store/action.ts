import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer.type';

export const selectCity = createAction<string>('SELECT_CITY');
export const setOffers = createAction<Offer[]>('GET_OFFERS');
