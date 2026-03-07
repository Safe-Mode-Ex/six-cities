import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer.type';
import { AppRoute } from '../../types/app-route.type';

type PlaceCardProps = {
  place: Offer;
};

const RATING_STARS_WIDTH = 20;

function PlaceCard({place}: PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={place.image} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${place.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
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
            <span style={{ width: `${place.rating * RATING_STARS_WIDTH}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${place.id}`}>{place.name}</Link>
        </h2>
        <p className="place-card__type">{place.features.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
