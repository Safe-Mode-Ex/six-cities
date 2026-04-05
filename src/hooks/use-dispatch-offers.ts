import { useEffect } from 'react';
import { useAppDispatch } from './use-app-selector';
import { fetchOffersAction } from '../store/api-actions';
import { setOffersLoading } from '../store/offers-process/offers-process';

function useDispatchOffers() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = dispatch(fetchOffersAction());

    return () => {
      abortController.abort();
      dispatch(setOffersLoading(true));
    };
  }, [dispatch]);
}

export default useDispatchOffers;
