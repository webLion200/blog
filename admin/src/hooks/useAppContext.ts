import { useContext } from 'react';
import type { IAppContext } from '../hoc/AppWraper/types';
import AppContext from '../hoc/AppWraper/context';

const useAppContext = <TSelected>(selector: (state: IAppContext | null) => TSelected) => {
  const context = useContext(AppContext);
  try {
    // __DEV__ && console.log(context, selector, selector(context));
    return selector(context);
  } catch (error) {
    return null;
  }
};

export default useAppContext