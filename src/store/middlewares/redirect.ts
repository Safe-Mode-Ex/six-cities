import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../reducer';
import browserHistory from '../../browser-history';
import { REDIRECT_TO_ROUTE_ACTION_NAME } from '../action';

type Reducer = ReturnType<typeof reducer>

export const redirect: Middleware<unknown, Reducer> =
    () =>
      (next) =>
        (action: PayloadAction<string>) => {
          if (action.type === REDIRECT_TO_ROUTE_ACTION_NAME) {
            browserHistory.push(action.payload);
          }

          return next(action);
        };
