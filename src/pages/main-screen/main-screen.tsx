import { useState } from 'react';
import Locations from '../../components/locations/locations';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Places from '../../components/places/places';
import { Offer, OfferMapPoint } from '../../types/offer.type';

type MainScreenProps = {
  offers: Offer[];
  cities: string[];
  mapTemplate: string;
};

function MainScreen({offers, cities, mapTemplate}: MainScreenProps): JSX.Element {
  const activeCityName = cities[3];
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);
  const points: OfferMapPoint[] = offers
    .filter(({ city }) => city.name === activeCityName)
    .map(({ city, id }) => ({
      ...city,
      id,
    }));

  const handleActiveOfferIdSet = (id: number | null) => setActiveOfferId(id);

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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <Locations cities={cities} activeCity={activeCityName} />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <Places offers={offers} setActiveOfferId={handleActiveOfferIdSet} />
            <div className="cities__right-section">
              <Map
                points={points}
                activeOfferId={activeOfferId}
                mapTemplate={mapTemplate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
