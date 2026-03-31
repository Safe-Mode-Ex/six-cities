import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/app-state';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, getFakeOffers } from '../utils/mocks';
import { APIRoute, NameSpace } from '../enums';
import { StatusCodes } from 'http-status-codes';
import { checkAuthAction, fetchOffersAction } from './api-actions';

describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ [NameSpace.Offers]: { offers: [] } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch checkAuthAction.pending and checkAuthAction.fulfilled with thunk checkAuthAction',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Login).reply(StatusCodes.OK);

        await store.dispatch(checkAuthAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          checkAuthAction.pending.type,
          checkAuthAction.fulfilled.type,
        ]);
      }
    );

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Login).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(checkAuthAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          checkAuthAction.pending.type,
          checkAuthAction.rejected.type,
        ]);
      }
    );
  });

  describe('fetchOffersAction', () => {
    it('should dispatch fetchOffersAction.pending, fetchOffersAction.fulfilled, when server response 200',
      async () => {
        const offersMock = getFakeOffers();
        mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, offersMock);

        await store.dispatch(fetchOffersAction());

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchOffersActtionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.fulfilled.type,
        ]);
        expect(fetchOffersActtionFulfilled.payload).toEqual(offersMock);
      }
    );

    it('should dispatch fetchOffersAction.pending, fetchOffersAction.rejected when server response 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

        await store.dispatch(fetchOffersAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.rejected.type,
        ]);
      }
    );
  });
});
