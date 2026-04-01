import Locations from '../../components/locations/locations';
import { useAppSelector } from '../../hooks/use-app-selector';
import cn from 'classnames';
import useDispatchCity from '../../hooks/use-dispatch-city';
import Header from '../../components/header/header';
import Places from '../../components/places/places';
import { getCity, getIsOffersDataLoading, getOffers } from '../../store/offers-process/selectors';
import useCityOffers from '../../hooks/use-city-offers';
import useDispatchOffers from '../../hooks/use-dispatch-offers';
import LoadingScreen from '../loading-screen/loading-screen';
import { Helmet } from 'react-helmet-async';

function MainScreen(): JSX.Element {
  //TODO: сделать навигацию по городам через роутер
  const activeCityName = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);
  const isLoading = useAppSelector(getIsOffersDataLoading);

  const cityOffers = useCityOffers(offers, activeCityName);
  const hasOffers = !!cityOffers?.length;

  useDispatchCity();
  useDispatchOffers();

  return isLoading ?
    <LoadingScreen /> :
    (
      <div className="page page--gray page--main">
        <Helmet>
          <title>6 cities. Let&apos;s travel a bit!</title>
        </Helmet>
        <Header />

        <main className={cn(
          'page__main page__main--index',
          {
            'page__main--index-empty': !hasOffers,
          })}
        >
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <Locations activeCity={activeCityName} />
          </div>
          <Places
            activeCityName={activeCityName}
            cityOffers={cityOffers}
            hasOffers={hasOffers}
          />
        </main>
      </div>
    );
}

export default MainScreen;
