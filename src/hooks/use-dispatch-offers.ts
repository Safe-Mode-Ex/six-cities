import { useEffect } from 'react';
import { useAppDispatch } from './use-app-selector';
import { fetchOffersAction } from '../store/api-actions';
import { setOffersLoading } from '../store/offers-process/offers-process';

function useDispatchOffers() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchOffersAction());
    }

    return () => {
      isMounted = false;
      dispatch(setOffersLoading(true));
    };
  }, [dispatch]);
}

export default useDispatchOffers;
