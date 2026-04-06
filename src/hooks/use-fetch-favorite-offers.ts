import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../store/api-actions';
import { selectAuthorizedStatus } from '../store/user-process/selector';
import { useAppSelector, useAppDispatch } from './use-app-selector';

function useFetchFavoriteOffers(): void {
  const isAuthorized = useAppSelector(selectAuthorizedStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      const abortController = dispatch(fetchFavoriteOffersAction());

      return () => {
        abortController.abort();
      };
    }
  }, [dispatch, isAuthorized]);
}

export default useFetchFavoriteOffers;
