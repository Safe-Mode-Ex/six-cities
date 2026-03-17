import Locations from '../../components/locations/locations';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Places from '../../components/places/places';
import { useAppSelector } from '../../hooks/use-app-selector';
import cn from 'classnames';
import NoPlaces from '../../components/no-places/no-places';
import { CITIES } from '../../mocks/cities';
import useDispatchCity from '../../hooks/use-dispatch-city';
import useDispatchOffers from '../../hooks/use-dispatch-offers';
import { getCityPoints } from '../../helpers';

type MainScreenProps = {
  mapTemplate: string;
};

function MainScreen({mapTemplate}: MainScreenProps): JSX.Element {
  //TODO: сделать навигацию по городам
  useDispatchCity();

  const activeCityName = useAppSelector(({ city }) => city);
  useDispatchOffers(activeCityName);

  const offers = useAppSelector((state) => state.offers);
  const activeOfferId = useAppSelector((state) => state.activeOfferId);
  const hasOffers = !!offers?.length;
  const points = getCityPoints(offers, activeCityName);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={cn(
        'page__main page__main--index',
        {
          'page__main--index-empty': !hasOffers,
        })}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations
            cities={CITIES}
            activeCity={activeCityName}
          />
        </div>
        <div className="cities">
          <div className={cn(
            'cities__places-container container',
            {
              'cities__places-container--empty': !hasOffers,
            })}
          >
            {hasOffers ?
              <Places /> :
              <NoPlaces city={activeCityName} />}
            <div className="cities__right-section">
              {!!points.length &&
              <Map
                points={points}
                activeOfferId={activeOfferId}
                mapTemplate={mapTemplate}
                extraClass='cities__map'
              />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
