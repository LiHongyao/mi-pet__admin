import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, useHistory } from 'umi'
import { DashboardOutlined, MailOutlined, AppstoreOutlined, CheckSquareOutlined } from '@ant-design/icons';
import styles from './index.scss';


const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
interface IProps {
  children?: React.ReactNode
}
const index: React.FC<IProps> = (props) => {
  const { location } = useHistory();
  const login = sessionStorage.isLogin;
  return login ? (
    <Layout className={styles.layout}>
      {/* 侧栏 */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="title-box">
          <img src={require('./images/logo.png')} alt="" className="logo"/>
          <p className="title">i觅宠 - 后台管理系统</p>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">仪表盘</Link>
          </Menu.Item>
          <SubMenu key="/goods" icon={<AppstoreOutlined />} title="商品管理">
            <Menu.Item key="/goods-news"><Link to="/goods-news">最近上传</Link></Menu.Item>
            <Menu.Item key="/goods"><Link to="/goods">商品列表</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="/after-sale/un-reviewed" icon={<MailOutlined />} title="退款售后">
            <Menu.Item key="/after-sale/un-reviewed"><Link to="/after-sale/un-reviewed">未处理</Link></Menu.Item>
            <Menu.Item key="/after-sale/reviewed"><Link to="/after-sale/reviewed">已处理</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="/business" icon={<CheckSquareOutlined />}>
            <Link to="/business">商家审核</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header></Header>
        <Content className="site-layout-background" style={{ margin: '10px', padding: 24, minHeight: 'max-content', borderRadius: '10px' }}>
          {props.children}
        </Content>
      </Layout>
    </Layout>
  ) : (
    <> {props.children} </>
  );
}

export default index
