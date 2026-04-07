import { act, renderHook } from '@testing-library/react';
import { State } from '../../types/app-state';
import useHandleBookmarkButtonClick from './use-handle-bookmark-button-click';
import { AppRoute } from '../../enums';

const mocks = vi.hoisted(() => ({
  dispatchMock: vi.fn(),
  useAppSelectorMock: vi.fn(),
  changeFavoriteStateActionMock: vi.fn(),
  redirectToRouteMock: vi.fn(),
}));

vi.mock('../use-app-selector/use-app-selector', () => ({
  useAppDispatch: () => mocks.dispatchMock,
  useAppSelector: () => mocks.useAppSelectorMock() as State,
}));

vi.mock('../../store/api-actions', () => ({
  changeFavoriteStateAction: mocks.changeFavoriteStateActionMock,
}));

vi.mock('../../store/action', () => ({
  redirectToRoute: mocks.redirectToRouteMock,
}));

describe('Hook: useHandleBookmarkButtonClick', () => {
  beforeEach(() => {
    mocks.changeFavoriteStateActionMock.mockReset();
  });

  afterAll(() => {
    mocks.dispatchMock.mockReset();
    mocks.useAppSelectorMock.mockReset();
    mocks.redirectToRouteMock.mockReset();
    mocks.changeFavoriteStateActionMock.mockReset();
  });

  it('should return a function', () => {
    mocks.useAppSelectorMock.mockReturnValue(true);

    const { result } = renderHook(() => useHandleBookmarkButtonClick());

    expect(result.current).toBeInstanceOf(Function);
  });

  it('should dispatch changeFavoriteStateAction with correct parameters when user is authorized', () => {
    mocks.useAppSelectorMock.mockReturnValue(true);
    const offerId = '1';
    const isFavorite = false;
    const mouseEventMock = { preventDefault: vi.fn() } as unknown as React.MouseEvent;

    const { result } = renderHook(() => useHandleBookmarkButtonClick());

    act(() => result.current(offerId, isFavorite)(mouseEventMock));

    expect(mouseEventMock.preventDefault).toHaveBeenCalled();
    expect(mocks.changeFavoriteStateActionMock).toHaveBeenCalledWith({
      offerId,
      status: Number(!isFavorite),
    });
    expect(mocks.redirectToRouteMock).not.toHaveBeenCalled();
  });

  it('should dispatch redirectToRoute action when user is not authorized', () => {
    mocks.useAppSelectorMock.mockReturnValue(false);
    const offerId = '1';
    const isFavorite = false;
    const mouseEventMock = { preventDefault: vi.fn() } as unknown as React.MouseEvent;

    const { result } = renderHook(() => useHandleBookmarkButtonClick());

    act(() => result.current(offerId, isFavorite)(mouseEventMock));

    expect(mouseEventMock.preventDefault).toHaveBeenCalled();
    expect(mocks.redirectToRouteMock).toHaveBeenCalledWith(AppRoute.Login);
    expect(mocks.changeFavoriteStateActionMock).not.toHaveBeenCalled();
  });
});
