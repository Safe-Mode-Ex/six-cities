import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../enums';
import { offerSlice } from './offer/offer';
import { offersSlice } from './offers/offers';
import { userSlice } from './user/user';
import { favoriteSlice } from './favorite/favorite';

export const rootReducer = combineReducers({
  [NameSpace.Offer]: offerSlice.reducer,
  [NameSpace.Offers]: offersSlice.reducer,
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Favorite]: favoriteSlice.reducer,
});
