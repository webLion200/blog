import { FC } from "react";
import { Link } from 'react-router-dom';
import { Menu, Popover, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { effects, actions } from "../../slice";
import store, { useTypedSelector } from '../../store';

import WIcon from "../Icon";
import './index.css';

const Item = Menu.Item

const SideMenu:FC = () => {
  const dispatch = useDispatch()
  const { articleList, currArticleInfo } = useTypedSelector(state => state.notebook)

  const addArticle = () => {
    const articleName = new Date().toLocaleDateString()
    dispatch(effects.addArticle({
      articleName,
      content: ''
    }))
  }

  const delArticle = () => {
    Modal.confirm({
      title: '确定删除吗？',
      onOk: async () => {
        await dispatch(effects.deleteArticle())
      }
    })
  }

  const content = (
    <div className="pop-content-wrap">
      <div className="pop-cont-item"><WIcon type="publish" /> 发布文章</div>
      <div className="pop-cont-item"><WIcon type="arrow-left" size={12} color="#999" style={{marginLeft:'-10px'}}/><WIcon type="folder" /> 移动文章</div>
      <div className="pop-cont-item" onClick={delArticle}><WIcon type="delete" /> 删除文章</div>
    </div>
  )

  const onSelect = (e: any) => {
    const currArticleInfo = articleList.filter(el => el['article_id'] == e.key)[0]
    dispatch(actions.changeCurrArticleInfo(currArticleInfo))
  }

  const _renderMenu = () => {
    const selectedKey = currArticleInfo['article_id'] + ''
    return (
      <Menu  className="articles-menu" theme="light" selectedKeys={[selectedKey]} onSelect={onSelect}>
        {
          articleList.map(article => (
            <Item key={article['article_id']}>
              <div className="menu-item-cont">
                <div className="flex-center-center">
                  <WIcon type="article" size={30} color="#999"/>
                  <span className="title">{article['article_name']}</span>
                </div>
                <Popover
                  content={content}
                  trigger="click"
                >
                  <WIcon type="setting" color="#999"/>
                </Popover>
              </div>
            </Item>
          ))
        }
      </Menu>
    )
  }

  return (
    <div className="side-menu-wrap">
      <div className="add-note" onClick={addArticle}>
        <WIcon type="add-circle" style={{marginRight:'5px'}}/> 新建文章
      </div>
      {_renderMenu()}
    </div>
  )
}

export default SideMenu