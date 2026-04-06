import { State } from '../../types/app-state';
import { AuthorizationStatus } from '../../types/authorization-status';
import { NameSpace } from '../../enums';
import { UserData } from '../../types/user-data';

export const selectAuthCheckedStatus = (state: Pick<State, NameSpace.User>) =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const selectAuthorizedStatus = (state: Pick<State, NameSpace.User>): boolean =>
  state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;

export const selectUser = (state: Pick<State, NameSpace.User>): UserData | null =>
  state[NameSpace.User].user;
