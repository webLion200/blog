import { FC } from "react";
import { Layout } from 'antd';
const { Sider, Content } = Layout;

interface BasicLayoutProps {
  MainMenu: FC;
  SideMenu: FC;
  BlogContent: FC;
}
const BasicLayout:FC<BasicLayoutProps> = (props) => {
  const {MainMenu, SideMenu, BlogContent} = props
  
  const renderMarketDown = () => {
    return <BlogContent />
  } 

  const renderNoteBooks = () => {
    return (
      <Layout>
        <Sider style={{ background: '#fff' }}>
          <SideMenu />
        </Sider>
        <Content>
          {renderMarketDown()}
        </Content> 
      </Layout>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider style={{ background: '#404040' }}>
        <MainMenu />
      </Sider>
      <Content>
        {renderNoteBooks()}
      </Content>
    </Layout>
  )
}

export default BasicLayout