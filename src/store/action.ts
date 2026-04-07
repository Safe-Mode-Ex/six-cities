import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../enums.ts';

export const REDIRECT_TO_ROUTE_ACTION_NAME = 'app/redirectToRoute';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE_ACTION_NAME);
