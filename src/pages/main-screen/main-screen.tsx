import Locations from '../../components/locations/locations';
import Map from '../../components/map/map';
import Places from '../../components/places/places';
import { useAppSelector } from '../../hooks/use-app-selector';
import cn from 'classnames';
import NoPlaces from '../../components/no-places/no-places';
import { CITIES } from '../../mocks/cities';
import useDispatchCity from '../../hooks/use-dispatch-city';
import { getCityPoints } from '../../helpers';
import Header from '../../components/header/header';

function MainScreen(): JSX.Element {
  //TODO: сделать навигацию по городам
  useDispatchCity();

  const activeCityName = useAppSelector(({ city }) => city);
  const offers = useAppSelector((state) => state.offers);
  const activeOfferId = useAppSelector((state) => state.activeOfferId);

  const cityOffers = offers.filter(({ city }) => city.name === activeCityName);
  const cityLocation = cityOffers[0]?.city.location;
  const hasOffers = !!cityOffers?.length;
  const points = getCityPoints(cityOffers);

  return (
    <div className="page page--gray page--main">
      <Header />

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
              <Places offers={cityOffers} /> :
              <NoPlaces city={activeCityName} />}
            <div className="cities__right-section">
              {!!points.length &&
              <Map
                location={cityLocation}
                points={points}
                activeOfferId={activeOfferId}
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
