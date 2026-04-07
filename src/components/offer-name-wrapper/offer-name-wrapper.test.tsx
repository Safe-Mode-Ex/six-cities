import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils';
import { getFakeOfferDetails } from '../../utils';
import OfferNameWrapper from './offer-name-wrapper';
import { NameSpace } from '../../enums';
import { AuthorizationStatus } from '../../types';
import userEvent from '@testing-library/user-event';

const mocks = vi.hoisted(() => ({
  handleBookmarkButtonClickFactory: vi.fn(() => vi.fn())
}));

vi.mock('../../hooks/use-handle-bookmark-click/use-handle-bookmark-button-click', () => ({
  default: vi.fn(() => mocks.handleBookmarkButtonClickFactory),
}));

describe('Component: OfferNameWrapper', () => {
  const offerDetailsMock = {
    ...getFakeOfferDetails(),
    isFavorite: true,
  };
  const stateMock = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    }
  };
  const { withStoreComponent } = withStore(
    <OfferNameWrapper
      offerId={offerDetailsMock.id}
      title={offerDetailsMock.title}
      isFavorite={offerDetailsMock.isFavorite}
    />,
    stateMock,
  );

  it('should render properly', () => {
    const visuallyHiddenText = /To bookmarks/i;

    render(withStoreComponent);

    expect(screen.getByText(offerDetailsMock.title)).toBeInTheDocument();
    expect(screen.getByText(visuallyHiddenText)).toBeInTheDocument();
  });

  it('should call handleBookmarkButtonClick, when user clicks button', async () => {
    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(mocks.handleBookmarkButtonClickFactory)
      .toHaveBeenCalledWith(offerDetailsMock.id, offerDetailsMock.isFavorite);
  });

  it('should have button with class offer__bookmark-button--active, when isFavorite: true', () => {
    render(withStoreComponent);
    expect(screen.getByRole('button')).toHaveClass('offer__bookmark-button--active');
  });
});
