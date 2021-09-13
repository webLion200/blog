import { FC } from "react";
import { Menu, Popover } from "antd";
import { Link } from 'react-router-dom';
import WIcon from "../Icon";
import './index.css'
const Item = Menu.Item

const MainMenu:FC = () => {
  const content = (
    <div className="pop-content-wrap">
      <div className="pop-cont-item"><WIcon type="edit"/> 修改文集</div>
      <div className="pop-cont-item"><WIcon type="delete"/> 删除文集</div>
    </div>
  )

  return (
    <div className="main-menu-wrap">
      <div className="back-btn-wrap flex-center-center">
        <Link to={{
          pathname: '/'
        }}>
          <div className="back-btn flex-center-center">返回首页</div>
        </Link>
      </div>
      <div className="add-key">
        <WIcon type="add" style={{marginRight:'5px'}}/>新建文集
      </div>
      <Menu style={{background: '#404040', color: '#fff'}}>
        <Item key="1">
          <div className="menu-item-cont">
            <span>111</span> 
            <Popover
              content={content}
              trigger="click"
            >
              <WIcon type="setting" color="#fff"/>
            </Popover>
          </div>
        </Item>
        <Item key="2">111</Item>
        <Item key="3">111</Item>
      </Menu>
    </div>
  )
}

export default MainMenu