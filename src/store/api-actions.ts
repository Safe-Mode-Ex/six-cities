import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/app-state';
import { AxiosInstance } from 'axios';
import { Offer, OfferDetails } from '../types/offer';
import { APIRoute } from '../enums';
import {
  loadNearbyOffers,
  loadOfferById,
  loadOffers,
  loadReviewsByOfferId,
  redirectToRoute,
  requireAuthorization,
  setCommentSendingStatus,
  setOffersDataLoadingStatus,
  setReviewForm,
  setUser
} from './action';
import { AuthorizationStatus } from '../types/authorization-status';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { AppRoute } from '../types/app-route';
import { NewReview, Review } from '../types/review';
import { initialState } from './reducer';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(loadOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferById',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<OfferDetails>(`${APIRoute.Offers}/${offerId}`);
    dispatch(loadOfferById(data));
    dispatch(setOffersDataLoadingStatus(false));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadReviewsByOfferId(data));
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearbyOffers(data));
  }
);

export const sendOfferReview = createAsyncThunk<void, {
  offerId: string; formData: NewReview;
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendOfferReview',
  async ({ offerId, formData}, { dispatch, extra: api }) => {
    dispatch(setCommentSendingStatus(true));
    await api.post<Review>(`${APIRoute.Comments}/${offerId}`, formData);
    dispatch(setCommentSendingStatus(false));
    dispatch(setReviewForm(initialState.reviewForm));
    dispatch(fetchCommentsAction(offerId));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'data/checkAuth',
  async (_, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password} , { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}>(
  'user/logout',
  async (_, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
