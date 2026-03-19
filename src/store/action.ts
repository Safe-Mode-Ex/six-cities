import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { SortType } from '../enums';
import { AuthorizationStatus } from '../types/authorization-status';

export const selectCity = createAction<string>('SELECT_CITY');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setSortType = createAction<SortType>('SET_SORT_TYPE');
export const setActiveOfferId = createAction<number | null>('SET_ACTIVE_OFFER_ID');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
