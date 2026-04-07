import { useEffect } from 'react';
import {
  fetchOfferByIdAction,
  fetchCommentsAction,
  fetchNearbyOffersAction
} from '../../store/api-actions/api-actions';
import { setOfferDetails } from '../../store/offer-process/offer-process';
import { OfferDetails } from '../../types';
import { useAppDispatch } from '../use-app-selector/use-app-selector';

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
