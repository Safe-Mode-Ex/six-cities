import Locations from '../../components/locations/locations';
import cn from 'classnames';
import Header from '../../components/header/header';
import Places from '../../components/places/places';
import { selectCityOffers, selectIsOffersDataLoading } from '../../store/offers-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import { Helmet } from 'react-helmet-async';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import useDispatchOffers from '../../hooks/use-dispatch-offers/use-dispatch-offers';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector';
import { getActiveCityParams } from '../../utils';
import { useParams } from 'react-router-dom';

function MainScreen(): JSX.Element {
  const { cityName } = useParams();
  const [isValidCity, activeCityName] = getActiveCityParams(cityName);

  const isLoading = useAppSelector(selectIsOffersDataLoading);
  const cityOffers = useAppSelector((state) => selectCityOffers(state, activeCityName));
  const hasOffers = !!cityOffers?.length;

  useDispatchOffers();

  if (!isValidCity) {
    return <NotFoundScreen />;
  }

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
            <Locations />
          </div>
          <Places activeCityName={activeCityName} cityOffers={cityOffers}/>
        </main>
      </div>
    );
}

export default MainScreen;
