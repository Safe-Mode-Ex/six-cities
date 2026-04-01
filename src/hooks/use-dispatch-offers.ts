import { useEffect } from 'react';
import { useAppDispatch } from './use-app-selector';
import { fetchOffersAction } from '../store/api-actions';

function useDispatchOffers() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchOffersAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);
}

export default useDispatchOffers;
