import {FC} from "react";
import LoginChecker from "../../hoc/LoginChecker";
import BasicLayout from '../layouts/BasicLayout';
import { MainMenu, SideMenu, BlogContent } from "../../components";
import './index.css'
type UserInfoProps = {}

const Notebooks: FC<UserInfoProps> = () => {
  return (
    <LoginChecker isLogin={true}>
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

export default Notebooks