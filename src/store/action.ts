import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../types/app-route';

export const REDIRECT_TO_ROUTE_ACTION_NAME = 'app/redirectToRoute';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE_ACTION_NAME);
