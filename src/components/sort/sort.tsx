import cn from 'classnames';
import { useState } from 'react';
import { SORT_TYPES } from '../../settings';
import { useAppDispatch, useAppSelector } from '../../hooks/use-app-selector';
import { setSortType } from '../../store/action';
import { SortType } from '../../enums';

function Sort(): JSX.Element {
  const [isOpened, setOpenedState] = useState(false);
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  const handleSetSortType = (type: SortType) => {
    dispatch(setSortType(type));
    setOpenedState(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpenedState(!isOpened)}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={cn(
        'places__options places__options--custom',
        { 'places__options--opened': isOpened }
      )}
      >
        {SORT_TYPES.map((type) => (
          <li
            className={cn(
              'places__option',
              { 'places__option--active': type === sortType }
            )}
            tabIndex={0}
            key={type}
            onClick={() => handleSetSortType(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sort;
