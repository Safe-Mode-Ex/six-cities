import { useEffect } from 'react';
import { fetchCommentsAction, fetchNearbyOffersAction, fetchOfferByIdAction } from '../store/api-actions';
import { OfferDetails } from '../types/offer';
import { useAppDispatch } from './use-app-selector';
import { setOfferDetails } from '../store/offer-process/offer-process';

function useOfferData(
  activeOfferId: string,
  offerDetails: OfferDetails | null,
): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = dispatch(fetchOfferByIdAction(activeOfferId));

    return () => {
      abortController.abort();
      dispatch(setOfferDetails(null));
    };
  }, [activeOfferId, dispatch]);

  useEffect(() => {
    let isMounted = true;

    if (offerDetails && isMounted) {
      dispatch(fetchCommentsAction(activeOfferId));
      dispatch(fetchNearbyOffersAction(activeOfferId));
    }

    return () => {
      isMounted = false;
    };
  }, [activeOfferId, dispatch, offerDetails]);
}

export default useOfferData;
