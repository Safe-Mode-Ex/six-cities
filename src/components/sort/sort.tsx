import cn from 'classnames';
import { memo, useRef, useState } from 'react';
import { SortType } from '../../enums';
import { selectSortType } from '../../store/offers-process/selectors';
import { setSortType } from '../../store/offers-process/offers-process';
import { getDefaultSortTypes } from '../../utils/helpers';
import useCloseSort from '../../hooks/use-close-sort/use-close-sort';
import { useAppSelector, useAppDispatch } from '../../hooks/use-app-selector/use-app-selector';

function Sort(): JSX.Element {
  const [isOpened, setOpenedState] = useState(false);
  const sortType = useAppSelector(selectSortType);
  const sortRef = useRef<HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleSortTypeClick = (type: SortType) => {
    dispatch(setSortType(type));
    setOpenedState(false);
  };

  useCloseSort(sortRef, setOpenedState);

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>&nbsp;
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpenedState(!isOpened)}
        ref={sortRef}
        data-testid="sorting-type"
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
        {getDefaultSortTypes().map((type) => (
          <li
            className={cn(
              'places__option',
              { 'places__option--active': type === sortType }
            )}
            tabIndex={0}
            key={type}
            onClick={() => handleSortTypeClick(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </form>
  );
}

const MemoizedSort = memo(Sort);

export default MemoizedSort;
