import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { IStoreState } from 'modules';

const useTypedSelector: TypedUseSelectorHook<IStoreState> = useSelector;

export default useTypedSelector;
