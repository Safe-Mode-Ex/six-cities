import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { FavoriteState } from '../../types';
import { fetchFavoriteOffersAction } from '../api-actions';

const initialState: FavoriteState = {
  favorites: [],
  isFavoriteLoading: false,
};

export const favoriteProcess = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
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
