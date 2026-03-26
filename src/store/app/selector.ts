import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import { NameSpace } from '../../enums';

export const getLoadingState = createSelector(
  (state: Pick<State, NameSpace.App>) => state,
  (state) => state[NameSpace.App].isLoading,
);
