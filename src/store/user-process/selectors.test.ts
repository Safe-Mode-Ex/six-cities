import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types/authorization-status';
import { getFakeUser } from '../../utils/mocks';
import { selectAuthCheckedStatus, selectAuthorizedStatus, selectUser } from './selector';

describe('UserProcess selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: getFakeUser(),
    }
  };

  it('should return authorization status checked from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = selectAuthCheckedStatus(state);
    expect(result).toBe(authorizationStatus !== AuthorizationStatus.Unknown);
  });

  it('should return is authorized status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = selectAuthorizedStatus(state);
    expect(result).toBe(authorizationStatus === AuthorizationStatus.Auth);
  });

  it('should return user data from state', () => {
    const { user } = state[NameSpace.User];
    const result = selectUser(state);
    expect(result).toEqual(user);
  });
});
