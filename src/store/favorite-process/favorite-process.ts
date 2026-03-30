import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { FavoriteState } from '../../types/app-state';
import { fetchFavoriteOffersAction } from '../api-actions';
import { getGroupedByCityOffers } from '../../utils/helpers';

const initialState: FavoriteState = {
  favorite: {},
  favoriteOffersCount: 0,
  isFavoriteLoading: false,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffersCount = action.payload.length;
        state.favorite = getGroupedByCityOffers(action.payload);
        state.isFavoriteLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteLoading = false;
      });
  }
});
