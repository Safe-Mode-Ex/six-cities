import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../../browser-history';
import { REDIRECT_TO_ROUTE_ACTION_NAME } from '../../action';
import { rootReducer } from '../../root-reducer';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> =
    () =>
      (next) =>
        (action: PayloadAction<string>) => {
          if (action.type === REDIRECT_TO_ROUTE_ACTION_NAME) {
            browserHistory.push(action.payload);
          }

          return next(action);
        };
