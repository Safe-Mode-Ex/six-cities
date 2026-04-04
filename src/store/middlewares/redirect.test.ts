import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../types/app-route';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';
import { AnyAction } from '@reduxjs/toolkit';
import { State } from '../../types/app-state';
import browserHistory from '../../browser-history';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to /login with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to any route with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.NotFound };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.NotFound);
  });
});
