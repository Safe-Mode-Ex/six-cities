import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../enums';
import { offerProcess } from './offer-process/offer-process';
import { offersProcess } from './offers-process/offers-process';
import { userProcess } from './user-process/user-process';
import { favoriteProcess } from './favorite-process/favorite-process';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Favorite]: favoriteProcess.reducer,
});
