import { FC } from "react";
import { Link } from 'react-router-dom';
import { Menu, Popover } from "antd";
import WIcon from "../Icon";
import './index.css';

const Item = Menu.Item

const SideMenu:FC = () => {
  const content = (
    <div className="pop-content-wrap">
      <div className="pop-cont-item"><WIcon type="publish" /> 发布文章</div>
      <div className="pop-cont-item"><WIcon type="arrow-left" size={12} color="#999" style={{marginLeft:'-10px'}}/><WIcon type="folder" /> 移动文章</div>
      <div className="pop-cont-item"><WIcon type="delete" /> 删除文章</div>
    </div>
  )

  return (
    <div className="side-menu-wrap">
      <div className="add-note">
        <WIcon type="add-circle" style={{marginRight:'5px'}}/> 新建文章
      </div>
      <Menu theme="light">
        <Item key="1">
          <div className="menu-item-cont">
            <div className="flex-center-center">
              <WIcon type="article" size={30} color="#999"/>
              <span className="title">2021-09-01</span>
            </div>
            <Popover
              content={content}
              trigger="click"
            >
              <WIcon type="setting" color="#999"/>
            </Popover>
          </div>
        </Item>
        <Item key="2">
          <div className="menu-item-cont">
            <div className="flex-center-center">
              <WIcon type="article" size={30} color="#999"/>
              <span className="title">2021-09-01</span>
            </div>
            <Popover
              content={content}
              trigger="click"
            >
              <WIcon type="setting" color="#999"/>
            </Popover>
          </div>
        </Item>
      </Menu>
    </div>
  )
}

export default SideMenu