import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../types/offer';
import { SortType } from '../enums';
import { AuthorizationStatus } from '../types/authorization-status';
import { AppRoute } from '../types/app-route';
import { UserData } from '../types/user-data';
import { NewReview, Review } from '../types/review';

export const REDIRECT_TO_ROUTE_ACTION_NAME = 'app/redirectToRoute';

export const selectCity = createAction<string>('app/selectCity');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
export const setSortType = createAction<SortType>('sort/setSortType');
export const setActiveOfferId = createAction<string | null>('offers/setActiveOfferId');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE_ACTION_NAME);
export const setUser = createAction<UserData>('user/setUser');
export const loadOfferById = createAction<OfferDetails>('offer/loadOfferById');
export const loadReviewsByOfferId = createAction<Review[]>('reviews/loadReviewsByOfferId');
export const loadNearbyOffers = createAction<Offer[]>('nearby/loadNearbyOffers');
export const setReviewForm = createAction<NewReview>('reviewForm/setReviewForm');
