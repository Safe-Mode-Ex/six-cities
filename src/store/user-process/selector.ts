import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import { AuthorizationStatus } from '../../types/authorization-status';
import { NameSpace } from '../../enums';

export const getAuthCheckedStatus = createSelector(
  (state: Pick<State, NameSpace.User>) => state,
  (state) => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown
);

export const getAuthorizedStatus = createSelector(
  (state: Pick<State, NameSpace.User>) => state,
  (state) => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth
);

export const getUser = createSelector(
  (state: Pick<State, NameSpace.User>) => state,
  (state) => state[NameSpace.User].user
);
