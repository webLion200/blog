import { FC, useState } from "react";
import { Menu, Popover, Modal } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import store, { useTypedSelector } from '../../store';
import { effects, actions } from "../../slice";

import WIcon from "../Icon";
import './index.css'
const Item = Menu.Item

const MainMenu:FC = () => {

  const dispatch = useDispatch()
  const { cataList, currCataInfo } = useTypedSelector(state => state.notebook)
  const [ showAddCataInput, setShowAddCataInput ] = useState(false)
  const [cataName, setCataName] = useState("");

  const handleAddCatalog = () => {
    setShowAddCataInput(true)
  }

  const handleCancelAddCata = () => {
    setShowAddCataInput(false)
    setCataName("")
  }

  const changeCataName = (e: any) => {
    const value = e.target.value
    setCataName(value)
  }

  const handleSubmitAddCata = async () => {
    await dispatch(effects.addCatalog(cataName))
    handleCancelAddCata()
  }

  const delCatalog = () => {
    Modal.confirm({
      title: '确定删除吗？',
      onOk: async () => {
        await dispatch(effects.deleteCatalog())
      }
    })
  }

  const editCatalog = () => {
    console.warn('修改文集还没做')
  }

  const content = (
    <div className="pop-content-wrap">
      <div className="pop-cont-item" onClick={editCatalog}><WIcon type="edit"/> 修改文集</div>
      <div className="pop-cont-item" onClick={delCatalog}><WIcon type="delete"/> 删除文集</div>
    </div>
  )

  const onSelect = (e: any) => {
    const currCataInfo = cataList.filter(el => el['cataId'] == e.key)[0]
    dispatch(actions.changeCurrCataInfo(currCataInfo))
  }

  const _renderMenu = () => {
    if(!cataList || cataList.length == 0) {
      return null
    }
    const selectedKey = currCataInfo['cataId'] + ''
    return (
      <Menu style={{background: '#404040', color: '#fff', marginTop: '10px'}} selectedKeys={[selectedKey]} onSelect={onSelect}>
        {cataList.map(cata => (
          <Item key={cata['cataId']}>
            <div className="menu-item-cont">
              <span>{cata['cataName']}</span> 
              <Popover
                content={content}
                trigger="click"
              >
                <WIcon type="setting" color="#fff"/>
              </Popover>
            </div>
          </Item>
        ))}
      </Menu>
    )
  }

  return (
    <div className="main-menu-wrap">
      <div className="back-btn-wrap flex-center-center">
        <Link to={{
          pathname: '/'
        }}>
          <div className="back-btn flex-center-center">返回首页</div>
        </Link>
      </div>
      <div className="add-key" onClick={handleAddCatalog}>
        <WIcon type="add" style={{marginRight:'5px'}}/>新建文集
      </div>
      {
        showAddCataInput && (
        <div className="add-catalog-wrap">
          <Input placeholder="请输入文集名..." value={cataName} maxLength={20} onChange={changeCataName} autoFocus/>
          <div className="btns">
            <div className="btn submit-btn" onClick={handleSubmitAddCata}>提 交</div>
            <div className="btn cancel-btn" onClick={handleCancelAddCata}>取 消</div>
          </div>
        </div>
        )
      }
      { _renderMenu() }
    </div>
  )
}

export default MainMenu