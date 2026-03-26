import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../enums';
import { AppState } from '../../types/app-state';
import { fetchOffersAction } from '../api-actions';

const initialState: AppState = {
  isLoading: false,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
