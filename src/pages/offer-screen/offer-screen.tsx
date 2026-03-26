import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Reviews from '../../components/reviews/reviews';
import { changeFavoriteStateAction, fetchCommentsAction, fetchNearbyOffers, fetchOfferByIdAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { getCityPoints } from '../../helpers';
import { Rating } from '../../enums';
import { MAX_MAP_NEARBY_OFFERS } from '../../const';
import { getNearbyOffers, getOfferDetails, getOfferReviews } from '../../store/offer/selector';
import cn from 'classnames';
import { getAuthorizedStatus } from '../../store/user-process/selector';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../types/app-route';

function OfferScreen(): JSX.Element {
  const activeOfferId = useParams().id as string;
  const offerDetails = useAppSelector(getOfferDetails);
  const offerReviews = useAppSelector(getOfferReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isAuthorized = useAppSelector(getAuthorizedStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!offerDetails || offerDetails.id !== activeOfferId) {
      dispatch(fetchOfferByIdAction(activeOfferId));
      dispatch(fetchCommentsAction(activeOfferId));
      dispatch(fetchNearbyOffers(activeOfferId));
    }
  }, [activeOfferId, offerDetails, dispatch]);

  const mapPoints = offerDetails ? [...getCityPoints(nearbyOffers.slice(0, MAX_MAP_NEARBY_OFFERS)), {
    id: offerDetails?.id,
    location: offerDetails?.location,
  }] : [];
  const cityLocation = offerDetails?.city.location;

  const handleBookmarkButtonClick = (evt: React.MouseEvent) => {
    evt.preventDefault();

    if (offerDetails && isAuthorized) {
      dispatch(changeFavoriteStateAction({
        offerId: offerDetails?.id,
        status: Number(!offerDetails.isFavorite),
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <div className="page">
      <Header />

      {offerDetails && (
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {offerDetails.images.map((src) => (
                  <div className="offer__image-wrapper" key={src}>
                    <img className="offer__image" src={src} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {offerDetails.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offerDetails.title}</h1>
                  <button
                    className={cn(
                      'offer__bookmark-button button',
                      { 'offer__bookmark-button--active': offerDetails.isFavorite }
                    )}
                    type="button"
                    onClick={handleBookmarkButtonClick}
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${Math.round(offerDetails.rating) * Rating.StarsWidth}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{offerDetails.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {offerDetails.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {offerDetails.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                        Max {offerDetails.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{offerDetails.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {offerDetails.goods.map((feature) => (
                      <li className="offer__inside-item" key={feature}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={offerDetails.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">
                      {offerDetails.host.name}
                    </span>
                    {offerDetails.host.isPro && <span className="offer__user-status">Pro</span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{offerDetails.description}</p>
                  </div>
                </div>
                <Reviews offerId={activeOfferId} reviews={offerReviews} />
              </div>
            </div>
            {cityLocation && (
              <Map
                location={cityLocation}
                points={mapPoints}
                activeOfferId={activeOfferId}
                extraClass='offer__map'
              />
            )}
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList offers={nearbyOffers} isOfferScreen />
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default OfferScreen;
