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
    if (offerDetails) {
      const commentsAbortController = dispatch(fetchCommentsAction(activeOfferId));
      const nearbyAbortController = dispatch(fetchNearbyOffersAction(activeOfferId));

      return () => {
        commentsAbortController.abort();
        nearbyAbortController.abort();
      };
    }
  }, [activeOfferId, dispatch, offerDetails]);
}

export default useOfferData;
