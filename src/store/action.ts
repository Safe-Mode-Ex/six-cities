import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer.type';
import { SortType } from '../enums';

export const selectCity = createAction<string>('SELECT_CITY');
export const setOffers = createAction<Offer[]>('GET_OFFERS');
export const setSortType = createAction<SortType>('SET_SORT_TYPE');
