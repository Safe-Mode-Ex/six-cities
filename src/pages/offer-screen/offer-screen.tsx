import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import Reviews from '../../components/reviews/reviews';
import { useAppSelector } from '../../hooks/use-app-selector';
import { MAX_MAP_NEARBY_OFFERS } from '../../const';
import { getNearbyOffers, getOfferDetails, getOfferReviews } from '../../store/offer-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import useOfferData from '../../hooks/use-offer-data';
import NearbyOffers from '../../components/nearby-offers/nearby-offers';
import OfferNameWrapper from '../../components/offer-name-wrapper/offer-name-wrapper';
import OfferInside from '../../components/offer-inside/offer-inside';
import OfferRating from '../../components/offer-rating/offer-rating';
import OfferGalleryContainer from '../../components/offer-gallery-container/offer-gallery-container';
import { getCityPoints } from '../../utils/helpers';

function OfferScreen(): JSX.Element {
  const activeOfferId = useParams().id as string;
  const offerDetails = useAppSelector(getOfferDetails);
  const offerReviews = useAppSelector(getOfferReviews);
  const nearbyOffers = useAppSelector(getNearbyOffers);

  useOfferData(activeOfferId, offerDetails);

  if (!offerDetails) {
    return <LoadingScreen />;
  }

  const mapPoints = [...getCityPoints(nearbyOffers.slice(0, MAX_MAP_NEARBY_OFFERS)), {
    id: offerDetails?.id,
    location: offerDetails?.location,
  }];
  const cityLocation = offerDetails.city.location;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGalleryContainer images={offerDetails.images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerDetails.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <OfferNameWrapper
                offerId={offerDetails.id}
                title={offerDetails.title}
                isFavorite={offerDetails.isFavorite}
              />
              <OfferRating rating={offerDetails.rating} />
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
              <OfferInside goods={offerDetails.goods} />
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
          <NearbyOffers nearbyOffers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
