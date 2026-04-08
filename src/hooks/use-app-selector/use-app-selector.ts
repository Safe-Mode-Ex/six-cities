import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, State } from '../../types';

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
