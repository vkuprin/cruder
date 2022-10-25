import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from 'antd';
import cs from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthProvider';
import styles from './index.module.scss';
import AuthService from '../../services/AuthService';
import { useUser } from '../../context/UserProvider';
import useNotification from '../../hooks/useNotification';
import isHttpError from '../../utils/api/statusCode';

const { Title } = Typography;
const { Content } = Layout;

interface LoginProps {
  email: string;
  password: string;
  domain: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const auth = useAuth();
  const { setUserData } = useUser();

  const from = location.state?.from?.pathname || '/users';

  const onFinish = ({ password, email }: LoginProps) => {
    AuthService.postSignIn({ email, password })
      .then((r) => {
        if (!isHttpError(r.code)) {
          setUserData(r.user);
          auth.signIn(email, () => navigate(from));
          localStorage.setItem('login', String(true));
          localStorage.setItem('tokens', JSON.stringify(r.tokens));
        } else {
          const firstKey = Object.keys(r.message)[0];
          useNotification({
            placement: 'topRight',
            message: 'Error',
            description: r.message[firstKey],
          });
        }
      }).catch((e) => {
      // eslint-disable-next-line no-console
        console.error(e);
      });
  };

  const onFinishFailed = (errorInfo: Error | any) => {
    useNotification(
      {
        placement: 'topRight',
        message: 'Error',
        description: 'Please check your email and password',
      },
    );
  };

  return (
    <Layout className={cs('layout-default', 'layout-signin', styles.zoom, styles.formLayout)}>
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col>
            <Title className="mb-15">Cruder</Title>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className={cs('row-col', styles.formContainer)}
            >
              <Form.Item
                className="username"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                className="username"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%', marginTop: '20px' }}
                >
                  SIGN IN
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default SignIn;
