import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Reviews from '../../components/reviews/reviews';
import { fetchCommentsAction, fetchNearbyOffers, fetchOfferByIdAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { RATING_MULTIPLIER } from '../../const';
import { getCityPoints } from '../../helpers';

type OfferScreenProps = {
  reviewMinLength: number;
  reviewMaxLength: number;
};

function OfferScreen({
  reviewMinLength,
  reviewMaxLength,
}: OfferScreenProps): JSX.Element {
  const activeOfferId = useParams().id as string;
  const offerDetails = useAppSelector((state) => state.offerDetails);
  const offerReviews = useAppSelector((state) => state.offerReviews);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const dispatch = useAppDispatch();

  if (!offerDetails || offerDetails.id !== activeOfferId) {
    dispatch(fetchOfferByIdAction(activeOfferId));
    dispatch(fetchCommentsAction(activeOfferId));
    dispatch(fetchNearbyOffers(activeOfferId));
  }

  const mapPoints = offerDetails ? [...getCityPoints(nearbyOffers.slice(0, 3)), {
    id: offerDetails?.id,
    location: offerDetails?.location,
  }] : [];
  const cityLocation = offerDetails?.city.location;

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
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${offerDetails.rating * RATING_MULTIPLIER}%`}}></span>
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
                <Reviews offerId={activeOfferId} reviews={offerReviews} reviewMinLength={reviewMinLength} reviewMaxLength={reviewMaxLength} />
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
