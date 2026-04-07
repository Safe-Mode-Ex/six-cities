import { createApi } from '../services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types';
import { Action } from 'redux';
import {
  AppThunkDispatch,
  extractActionsTypes,
  getFakeFavorite,
  getFakeOfferDetails,
  getFakeOffers,
  getFakeReviews
} from '../utils';
import { APIRoute, FavoriteStatus, NameSpace } from '../enums';
import { StatusCodes } from 'http-status-codes';
import {
  changeFavoriteStateAction,
  checkAuthAction,
  fetchCommentsAction,
  fetchFavoriteOffersAction,
  fetchNearbyOffersAction,
  fetchOfferByIdAction,
  fetchOffersAction,
  sendOfferReviewAction
} from './api-actions';
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

    it('should dispatch fetchOfferByIdAction.pending, fetchOfferByIdAction.fulfiled with null when server response 400',
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

    it('should dispatch fetchOfferByIdAction.pending, fetchOfferByIdAction.fulfiled with null and redirect to NotFound when server response 404',
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

  describe('fetchCommentsAction', () => {
    it('should dispatch fetchCommentsAction.pending, fetchCommentsAction.fulfilled, when server response 200',
      async () => {
        const offerId = '1';
        const reviewsMock = getFakeReviews();
        mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(StatusCodes.OK, reviewsMock);

        await store.dispatch(fetchCommentsAction(offerId));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchCommentsAction.pending.type,
          fetchCommentsAction.fulfilled.type,
        ]);
        expect(fetchCommentsActionFulfilled.payload).toEqual(reviewsMock);
      });

    it('should dispatch fetchCommentsAction.pending, fetchCommentsAction.rejected when server response 400', async () => {
      const offerId = '1';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${offerId}`).reply(StatusCodes.BAD_REQUEST);

      await store.dispatch(fetchCommentsAction(offerId));
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch fetchNearbyOffersAction.pending, fetchNearbyOffersAction.fulfilled, when server response 200',
      async () => {
        const offerId = '1';
        const offersMock = getFakeOffers();
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(StatusCodes.OK, offersMock);

        await store.dispatch(fetchNearbyOffersAction(offerId));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchNearbyOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchNearbyOffersAction.pending.type,
          fetchNearbyOffersAction.fulfilled.type,
        ]);
        expect(fetchNearbyOffersActionFulfilled.payload).toEqual(offersMock);
      });

    it('should dispatch fetchNearbyOffersAction.pending, fetchNearbyOffersAction.rejected, when server response 400',
      async () => {
        const offerId = '1';
        mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}/nearby`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchNearbyOffersAction(offerId));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);

        expect(extractedActionsTypes).toEqual([
          fetchNearbyOffersAction.pending.type,
          fetchNearbyOffersAction.rejected.type,
        ]);
      });
  });

  describe('sendOfferReviewAction', () => {
    it('should dispatch sendOfferReviewAction.pending, fetchCommentsAction.pending, fetchNearByOffersAction.fulfilled, when server reponse 200',
      async () => {
        const offerId = '1';
        const comment = { offerId, formData: { rating: 0, comment: '' }};
        mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(StatusCodes.OK);

        await store.dispatch(sendOfferReviewAction(comment));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);

        expect(extractedActionsTypes).toEqual([
          sendOfferReviewAction.pending.type,
          fetchCommentsAction.pending.type,
          sendOfferReviewAction.fulfilled.type,
        ]);
      });

    it('should dispatch sendOfferReviewAction.pending, fetchNearByOffersAction.rejected, when server reponse 400',
      async () => {
        const offerId = '1';
        const comment = { offerId, formData: { rating: 0, comment: '' }};
        mockAxiosAdapter.onPost(`${APIRoute.Comments}/${offerId}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(sendOfferReviewAction(comment));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);

        expect(extractedActionsTypes).toEqual([
          sendOfferReviewAction.pending.type,
          sendOfferReviewAction.rejected.type,
        ]);
      });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch fetchFavoriteOffersAction.pending, fetchFavoriteOffersAction.fulfilled, when server response 200',
      async () => {
        const favoriteMock = getFakeFavorite();
        mockAxiosAdapter.onGet(APIRoute.Favorite).reply(StatusCodes.OK, favoriteMock);

        await store.dispatch(fetchFavoriteOffersAction());
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const fetchFavoriteOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          fetchFavoriteOffersAction.pending.type,
          fetchFavoriteOffersAction.fulfilled.type,
        ]);
        expect(fetchFavoriteOffersActionFulfilled.payload).toEqual(favoriteMock);
      }
    );

    it('should dispatch fetchFavoriteOffersAction.pending, fetchFavoriteOffersAction.rejected, when server response 400',
      async () => {
        mockAxiosAdapter.onGet(APIRoute.Favorite).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchFavoriteOffersAction());
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);

        expect(extractedActionsTypes).toEqual([
          fetchFavoriteOffersAction.pending.type,
          fetchFavoriteOffersAction.rejected.type,
        ]);
      }
    );
  });

  describe('changeFavoriteStateAction', () => {
    it('should dispatch changeFavoriteStateAction.pending, fetchFavoriteOffersAction.pending, changeFavoriteStateAction.fulfilled, when server response 200',
      async () => {
        const offerId = '1';
        const expectedStatus = FavoriteStatus.Enabled;
        const expectedFavoriteMock = { ...getFakeFavorite(), isFavorite: Boolean(expectedStatus) };
        mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${offerId}/${expectedStatus}`).reply(StatusCodes.OK, expectedFavoriteMock);

        await store.dispatch(changeFavoriteStateAction({ offerId, status: expectedStatus }));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);
        const changeFavoriteStateActionFulFilled = emittedActions.at(2) as ReturnType<typeof changeFavoriteStateAction.fulfilled>;

        expect(extractedActionsTypes).toEqual([
          changeFavoriteStateAction.pending.type,
          fetchFavoriteOffersAction.pending.type,
          changeFavoriteStateAction.fulfilled.type,
        ]);
        expect(changeFavoriteStateActionFulFilled.payload).toEqual(expectedFavoriteMock);
      }
    );

    it('should dispatch changeFavoriteStateAction.pending, changeFavoriteStateAction.rejected, when server response 400',
      async () => {
        const offerId = '1';
        const expectedStatus = FavoriteStatus.Enabled;
        mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${offerId}/${expectedStatus}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(changeFavoriteStateAction({ offerId, status: expectedStatus }));
        const emittedActions = store.getActions();
        const extractedActionsTypes = extractActionsTypes(emittedActions);

        expect(extractedActionsTypes).toEqual([
          changeFavoriteStateAction.pending.type,
          changeFavoriteStateAction.rejected.type,
        ]);
      });
  });
});
