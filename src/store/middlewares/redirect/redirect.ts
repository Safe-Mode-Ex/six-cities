import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../../browser-history';
import { REDIRECT_TO_ROUTE_ACTION_NAME } from '../../action';
import { rootReducer } from '../../root-reducer';

const { VITE_BASE_URL } = import.meta.env;

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> =
    () =>
      (next) =>
        (action: PayloadAction<string>) => {
          if (action.type === REDIRECT_TO_ROUTE_ACTION_NAME) {
            browserHistory.push(`${VITE_BASE_URL}${action.payload}`);
          }

          return next(action);
        };
