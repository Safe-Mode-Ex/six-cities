import { AuthorizationStatus } from '../../types';
import { getFakeUser } from '../../utils';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set state with checkAuthAction.fulfilled action', () => {
    const user = getFakeUser();
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
    };

    const result = userProcess.reducer(undefined, checkAuthAction.fulfilled(user, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set state with checkAuthAction.rejected action', () => {
    const user = getFakeUser();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
    };

    const { authorizationStatus } = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set state with loginAction.fulfilled action', () => {
    const user = getFakeUser();
    const authData = { email: '', password: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
    };

    const result = userProcess.reducer(undefined, loginAction.fulfilled(user, '', authData));

    expect(result).toEqual(expectedState);
  });

  it('should set state with loginAction.rejected action', () => {
    const user = getFakeUser();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
    };

    const { authorizationStatus } = userProcess.reducer(initialState, loginAction.rejected);

    expect(authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should set state with loginAction.rejected action', () => {
    const user = getFakeUser();
    const initialState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user,
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
