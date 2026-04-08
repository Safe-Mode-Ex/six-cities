import { render, screen } from '@testing-library/react';
import { getDefaultSortTypes } from '../../utils';
import MemoizedSort from './sort';
import { withStore } from '../../utils';
import { NameSpace } from '../../enums';
import userEvent from '@testing-library/user-event';
import { extractActionsTypes } from '../../utils';

describe('Component: Sort', () => {
  const stateMock = {
    [NameSpace.Offers]: {
      sortType: getDefaultSortTypes()[0],
      city: '',
      offers: [],
      isOffersLoading: false,
    }
  };
  const sortTypes = getDefaultSortTypes();
  const { withStoreComponent, mockStore } = withStore(<MemoizedSort />, stateMock);

  it('should render properly', () => {
    const sortByText = /Sort by/i;

    render(withStoreComponent);

    expect(screen.getByText(sortByText)).toBeInTheDocument();
  });

  it('should open sort menu when clicking on caption', async () => {
    render(withStoreComponent);
    await userEvent.click(screen.getByTestId('sorting-type'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
    expect(screen.getAllByRole('listitem').length).toBe(sortTypes.length);
  });

  it('should dispatch setSortType action when clicking on sort option', async () => {
    render(withStoreComponent);

    await userEvent.click(screen.getByTestId('sorting-type'));
    await userEvent.click(screen.getAllByRole('listitem')[1]);
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toContain('offers/setSortType');
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });
});
