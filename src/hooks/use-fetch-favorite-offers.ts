import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../store/api-actions';
import { getAuthorizedStatus } from '../store/user-process/selector';
import { useAppSelector, useAppDispatch } from './use-app-selector';

function useFetchFavoriteOffers(): void {
  const isAuthorized = useAppSelector(getAuthorizedStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isAuthorized && isMounted) {
      dispatch(fetchFavoriteOffersAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthorized]);
}

export default useFetchFavoriteOffers;
