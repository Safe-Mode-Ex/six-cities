import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { FavoriteState } from '../../types/app-state';
import { fetchFavoriteOffersAction } from '../api-actions';
import { getGroupedByCityOffers } from '../../helpers';

const initialState: FavoriteState = {
  favorite: {},
  favoriteOffersCount: 0,
};

export const favoriteSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffersCount = action.payload.length;
        state.favorite = getGroupedByCityOffers(action.payload);
      });
  }
});
