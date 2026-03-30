import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../enums';
import { offerProcess } from './offer-process/offer-process';
import { offersSlice } from './offers/offers';
import { userSlice } from './user/user';
import { favoriteProcess } from './favorite-process/favorite-process';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Favorite]: favoriteProcess.reducer,
});
