import { createAction } from '@reduxjs/toolkit';
import { Offer, OfferDetails } from '../types/offer';
import { SortType } from '../enums';
import { AuthorizationStatus } from '../types/authorization-status';
import { AppRoute } from '../types/app-route';
import { UserData } from '../types/user-data';
import { NewReview, Review } from '../types/review';

export const REDIRECT_TO_ROUTE_ACTION_NAME = 'app/redirectToRoute';

export const selectCity = createAction<string>('app/selectCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setSortType = createAction<SortType>('app/setSortType');
export const setActiveOfferId = createAction<string | null>('app/setActiveOfferId');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE_ACTION_NAME);
export const setUser = createAction<UserData>('user/setUser');
export const loadOfferById = createAction<OfferDetails>('data/loadOfferById');
export const clearOfferDetails = createAction('data/clearOfferDetails');
export const loadReviewsByOfferId = createAction<Review[]>('data/loadReviewsByOfferId');
export const clearOfferReviews = createAction('data/clearOfferReviews');
export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');
export const clearNearbyOffers = createAction('data/clearNearbyOffers');
export const setCommentSendingStatus = createAction<boolean>('data/setCommentSendingStatus');
export const setReviewForm = createAction<NewReview>('reviews/setReviewForm');
