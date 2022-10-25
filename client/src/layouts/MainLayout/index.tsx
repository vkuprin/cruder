import {
  useState, ReactNode, SetStateAction,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import cs from 'classnames';
import Menu from '../../components/Menu';
import Header from '../../components/Header';

const { Header: AntHeader, Content, Sider } = Layout;

interface MainProps {
    children?: ReactNode;
}

const MainLayout = ({ children }: MainProps) => {
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState('white');

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type: SetStateAction<string>) => setSidenavType(type);

  let { pathname } = useLocation();
  pathname = pathname.replace('/', '');

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === 'profile' ? 'layout-profile' : ''
      }`}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={240}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === '#fff' ? 'active-route' : ''
        }`}
        style={{ background: sidenavType }}
      >
        <Menu color="white" />
      </Sider>
      <Layout style={{
        width: '100%',
      }}
      >
        <AntHeader>
          <Header
            onPress={openDrawer}
            handleSidenavType={handleSidenavType}
          />
        </AntHeader>
        <Content className={cs('content-ant')}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
