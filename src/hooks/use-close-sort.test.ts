import { renderHook, fireEvent } from '@testing-library/react';
import useCloseSort from './use-close-sort';

describe('Hook: useCloseSort', () => {
  let sortElement: HTMLElement;
  let sortRef: React.RefObject<HTMLElement>;
  let setOpenedState: (isOpened: boolean) => void;

  beforeEach(() => {
    sortElement = document.createElement('div');
    sortRef = { current: sortElement };
    setOpenedState = vi.fn();
  });

  it('should call setOpenedState with false when clicking outside of the sort element', () => {
    const outsideElement = document.createElement('div');
    document.body.append(sortElement, outsideElement);

    renderHook(() => useCloseSort(sortRef, setOpenedState));
    fireEvent.click(outsideElement);

    expect(setOpenedState).toHaveBeenCalledWith(false);
  });

  it('should not call setOpenedState when clicking inside the sort element', () => {
    renderHook(() => useCloseSort(sortRef, setOpenedState));

    fireEvent.click(sortElement);

    expect(setOpenedState).not.toHaveBeenCalledWith();
  });
});
