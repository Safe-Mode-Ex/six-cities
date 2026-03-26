import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/app-state';
import { AxiosError, AxiosInstance } from 'axios';
import { Offer, OfferDetails } from '../types/offer';
import { APIRoute, FavoriteStatus } from '../enums';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { AppRoute } from '../types/app-route';
import { NewReview, Review } from '../types/review';
import { StatusCodes } from 'http-status-codes';
import { setOfferDetails } from './offer/offer';

export type ActionConfig = {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, ActionConfig>(
  'offers/fetchOffers',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferByIdAction = createAsyncThunk<OfferDetails | null, string, ActionConfig>(
  'offer/fetchOfferById',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OfferDetails>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      const errorCode = (error as AxiosError).response?.status;

      if (errorCode === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }

      return null;
    }
  }
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, ActionConfig>(
  'offer/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offer[], string, ActionConfig>(
  'offer/fetchNearbyOffers',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  }
);

export const sendOfferReview = createAsyncThunk<void, {
  offerId: string; formData: NewReview;
}, ActionConfig>(
  'data/sendOfferReview',
  async ({ offerId, formData}, { dispatch, extra: api }) => {
    await api.post<Review>(`${APIRoute.Comments}/${offerId}`, formData);
    dispatch(fetchCommentsAction(offerId));
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, ActionConfig>(
  'user/checkAuth',
  async (_, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, ActionConfig>(
  'user/login',
  async ({ email, password } , { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ActionConfig>(
  'user/logout',
  async (_, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<Offer[], undefined, ActionConfig>(
  'favorite/fetchFavoriteOffersAction',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);
    return data;
  }
);

export const changeFavoriteStateAction = createAsyncThunk<void, {
  offerId: string;
  status: FavoriteStatus;
}, ActionConfig>(
  'favorite/changeFavoriteStateAction',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferDetails>(`${APIRoute.Favorite}/${offerId}/${status}`);
    dispatch(setOfferDetails(data));
    dispatch(fetchFavoriteOffersAction());
  }
);
