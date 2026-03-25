import Locations from '../../components/locations/locations';
import { useAppSelector } from '../../hooks/use-app-selector';
import cn from 'classnames';
import useDispatchCity from '../../hooks/use-dispatch-city';
import Header from '../../components/header/header';
import { useMemo } from 'react';
import Places from '../../components/places/places';
import { getCity, getOffers } from '../../store/offers/selector';

function MainScreen(): JSX.Element {
  //TODO: сделать навигацию по городам
  useDispatchCity();

  const activeCityName = useAppSelector(getCity);
  const offers = useAppSelector(getOffers);

  const cityOffers = useMemo(
    () => offers.filter(({ city }) => city.name === activeCityName),
    [activeCityName, offers]
  );

  const hasOffers = !!cityOffers?.length;

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
