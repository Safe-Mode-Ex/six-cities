import { RefObject, useEffect } from 'react';
import { CLICK_EVENT_NAME } from '../../const';

function useCloseSort(sortRef: RefObject<HTMLElement>, setOpenedState: (isOpened: boolean) => void) {
  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (evt.target instanceof HTMLElement && !sortRef.current?.contains(evt.target)) {
        setOpenedState(false);
      }
    };

    document.addEventListener(CLICK_EVENT_NAME, handleOutsideClick);

    return () => {
      document.removeEventListener(CLICK_EVENT_NAME, handleOutsideClick);
    };
  }, [sortRef, setOpenedState]);
}

export default useCloseSort;
