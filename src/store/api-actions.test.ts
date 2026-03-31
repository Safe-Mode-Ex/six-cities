import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/app-state';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, getFakeOfferDetails, getFakeOffers } from '../utils/mocks';
import { APIRoute, NameSpace } from '../enums';
import { StatusCodes } from 'http-status-codes';
import { checkAuthAction, fetchOfferByIdAction, fetchOffersAction } from './api-actions';
import { redirectToRoute } from './action';

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
        mockAxiosAdapter.onGet(APIRoute.Offers).reply(StatusCodes.OK, offersMock);

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
        mockAxiosAdapter.onGet(APIRoute.Offers).reply(StatusCodes.BAD_REQUEST, []);

        await store.dispatch(fetchOffersAction());
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([
          fetchOffersAction.pending.type,
          fetchOffersAction.rejected.type,
        ]);
      }
    );
  });

  describe('fetchOfferByIdAction', () => {
    it('should dispacth fetchOfferByIdAction.pending, fetchOfferAction.fulfilled, when server response 200',
      async () => {
        const offerMock = getFakeOfferDetails();
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerMock.id}`).reply(StatusCodes.OK, offerMock);

        await store.dispatch(fetchOfferByIdAction(offerMock.id));

        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchOfferByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferByIdAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchOfferByIdAction.pending.type,
          fetchOfferByIdAction.fulfilled.type,
        ]);
        expect(fetchOfferByIdActionFulfilled.payload).toEqual(offerMock);
      }
    );

    it('should dispatch fetchOfferById.pending, fetchOfferById.fulfiled with null when server response 400',
      async () => {
        const offerId = '1';
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchOfferByIdAction(offerId));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchOfferByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferByIdAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchOfferByIdAction.pending.type,
          fetchOfferByIdAction.fulfilled.type,
        ]);
        expect(fetchOfferByIdActionFulfilled.payload).toBeNull();
      }
    );

    it('should dispatch fetchOfferById.pending, fetchOfferById.fulfiled with null and redirect to NotFound when server response 404',
      async() => {
        const offerId = '1';
        const error = { reponse: StatusCodes.NOT_FOUND };
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(StatusCodes.NOT_FOUND, error);

        await store.dispatch(fetchOfferByIdAction(offerId));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchOfferByIdActionFulfilled = emittedActions.at(2) as ReturnType<typeof fetchOfferByIdAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchOfferByIdAction.pending.type,
          redirectToRoute.type,
          fetchOfferByIdAction.fulfilled.type,
        ]);

        expect(fetchOfferByIdActionFulfilled.payload).toBeNull();
      });
  });
});
