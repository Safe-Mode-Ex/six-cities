import { useEffect } from 'react';
import { fetchOffersAction } from '../../store/api-actions';
import { setOffersLoading } from '../../store/offers-process/offers-process';
import { useAppDispatch } from '../use-app-selector/use-app-selector';

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
