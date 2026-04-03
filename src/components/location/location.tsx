import { CITIES } from '../../const';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type LocationProps = {
    city: typeof CITIES[number];
    onCityClick: (city: string) => void;
}

function Location({ city, onCityClick }: LocationProps): JSX.Element {
  const handleCityClick = () => {
    onCityClick(city);
  };

  return (
    <li className="locations__item" key={city}>
      <NavLink
        to={`/${city.toLowerCase()}`}
        className={({ isActive }) => cn(
          'locations__item-link tabs__item',
          { 'tabs__item--active': isActive }
        )}
        onClick={handleCityClick}
      >
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export default Location;
