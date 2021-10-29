import { FC, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import { Menu, Popover, Modal } from "antd";
import { useDispatch } from 'react-redux';
import { effects, actions } from "../../slice";
import { useTypedSelector } from '../../store';

import WIcon from "../Icon";
import './index.css';

const Item = Menu.Item

const SideMenu:FC = () => {
  const dispatch = useDispatch()
  const { articleList, currArticleInfo, cataList, currCataInfo } = useTypedSelector(state => state.notebook)
  const [cataListCopy, setCataListCopy] = useState([] as CatalogType[])
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

  const handleChangeCatalog = (e:any) => {
    const id = e.target.id
    dispatch(effects.moveArticle(id))
  }

  const popCont = () => {
    return (
      <div className="move-aritcle-wrap">
        {
          cataListCopy.map((item: CatalogType) => <p className="move-aritcle-item" key={item.cataId} id={item.cataId} onClick={handleChangeCatalog}>{item.cataName}</p>)
        }
      </div>
    )
  }

  const handleTriggerMoveArticlePop = (visible:any) => {
    if(visible) {
      const list = cataList.filter(cata => cata.cataId != currCataInfo.cataId)
      setCataListCopy(list)
    }
  }

  const content = (
    <div className="pop-content-wrap">
      <div className="pop-cont-item"><WIcon type="publish" /> 发布文章</div>
      <Popover content={popCont} placement="left" trigger="click" onVisibleChange={handleTriggerMoveArticlePop}>
        <div className="pop-cont-item"><WIcon type="arrow-left" size={12} color="#999" style={{marginLeft:'-10px'}}/><WIcon type="folder" /> 移动文章</div>
      </Popover>
      <div className="pop-cont-item" onClick={delArticle}><WIcon type="delete" /> 删除文章</div>
    </div>
  )

  const onSelect = (e: any) => {
    const currArticleInfo = articleList.filter(el => el['articleId'] == e.key)[0]
    dispatch(actions.changeCurrArticleInfo(currArticleInfo))
  }

  const _renderMenu = () => {
    const selectedKey = currArticleInfo['articleId'] + ''
    return (
      <Menu  className="articles-menu" theme="light" selectedKeys={[selectedKey]} onSelect={onSelect}>
        {
          articleList.map(article => (
            <Item key={article['articleId']}>
              <div className="menu-item-cont">
                <div className="flex-center-center">
                  <WIcon type="article" size={30} color="#999"/>
                  <span className="title">{article['articleName']}</span>
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