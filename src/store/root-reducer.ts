import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../enums';
import { offer } from './offer/offer';
import { offers } from './offers/offers';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offer.reducer,
  [NameSpace.Offers]: offers.reducer,
  [NameSpace.User]: userProcess.reducer,
});
