import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer.type';
import { AppRoute } from '../../types/app-route.type';

type OfferCardProps = {
  offer: Offer;
  onHover: (offerId: number | null) => void;
  isFavoritesScreen: boolean;
};

const RATING_STARS_WIDTH = 20;

function OfferCard({offer, onHover, isFavoritesScreen}: OfferCardProps): JSX.Element {
  return (
    <article className={`${isFavoritesScreen ? 'favorites__card' : 'cities__card'} place-card`}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${isFavoritesScreen ? 'favorites__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <a
          href="#"
          onMouseEnter={() => onHover(offer.id)}
          onMouseLeave={() => onHover(null)}
        >
          <img
            className="place-card__image"
            src={offer.image}
            width={isFavoritesScreen ? 150 : 260}
            height={isFavoritesScreen ? 110 : 200}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${isFavoritesScreen && 'favorites__card-info '}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * RATING_STARS_WIDTH}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.name}</Link>
        </h2>
        <p className="place-card__type">{offer.features.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
