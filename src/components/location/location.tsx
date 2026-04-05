import { CITIES } from '../../const';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

type LocationProps = {
    city: typeof CITIES[number];
}

function Location({ city }: LocationProps): JSX.Element {
  return (
    <li className="locations__item" key={city}>
      <NavLink
        to={`/${city.toLowerCase()}`}
        className={({ isActive }) => cn(
          'locations__item-link tabs__item',
          { 'tabs__item--active': isActive }
        )}
      >
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export default Location;
