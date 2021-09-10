import { FC } from "react";
import AppContext from "./context";
import useAppData from './useAppData';


const AppWrapper:FC = (props) => {

  const appData = useAppData();

  return (
    <AppContext.Provider value={appData}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppWrapper