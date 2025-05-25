import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Dashboard from './ComponentPage/Dashboard';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const App = ({ username }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1'); // Default to '1' (Dashboard)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const renderComponent = () => {
    switch (selectedKey) {
      case '1':
        return <Dashboard />;
      case '2':
        return <p>Option 2 selected</p>;
      case '3':
        return <p>User: Tom</p>;
      case '4':
        return <p>User: Bill</p>;
      case '5':
        return <p>User: Alex</p>;
      default:
        return <p>Chọn một mục từ Menu</p>;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ backgroundColor: 'white' }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ padding: '0 16px', color: '#000', fontSize: '18px' }}>
            Welcome, {username || 'User'}!
          </div>
        </Header>
        <Content style={{ margin: '20px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 700,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderComponent()}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;