import {FC} from "react";
import { Provider, useDispatch } from 'react-redux';
import { useMount } from "ahooks";
import store, { useTypedSelector } from './store';
import { effects, actions } from "./slice";

import LoginChecker from "../../hoc/LoginChecker";
import BasicLayout from '../layouts/BasicLayout';
import { MainMenu, SideMenu, BlogContent } from "./components";
import './index.css'
type UserInfoProps = {}

const Notebooks: FC<UserInfoProps> = () => {
  const dispatch = useDispatch()
  useMount(async () => {
    await dispatch(effects.initCataList())
  })
  
  return (
    <LoginChecker isLogin={false}>
      <div className="container">
        <BasicLayout
          MainMenu={MainMenu}
          SideMenu={SideMenu}
          BlogContent={BlogContent}
        />
      </div>
    </LoginChecker>
  )
}

const Container = () => (
  <Provider store={store}>
    <Notebooks />
  </Provider>
)

export default Container