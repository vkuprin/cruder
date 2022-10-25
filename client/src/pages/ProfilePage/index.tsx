import {
  Avatar, Card, Col, Descriptions, Row, Switch,
} from 'antd';

import { useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import BgProfile from '../../assets/images/bg-signup.jpg';
import profilavatar from '../../assets/images/profile_avatar.png';
import { useUser } from '../../context/UserProvider';
import EditModal from './components/EditModal';
import UsersService from '../../services/UsersService';
import useNotification from '../../hooks/useNotification';

const ProfilePage = () => {
  const [{
    email,
    fullName,
    namePrefix,
    phoneNumber,
    practitionerId,
    userType,
    active,
    product,
    provider,
    password,
  }, setSpecificData] = useState<Record<string, any>>({});
  const apiData = useUser();
  const { userData } = apiData;
  const { ID } = useParams();

  useEffect(() => {
    if (ID) {
      UsersService
        .getSpecificUser(ID)
        .then((userResult) => {
          console.log(userResult);
          setSpecificData(userResult);
        });
    }
  }, [ID, apiData]);

  if (typeof userData !== 'object') {
    useNotification({
      placement: 'topRight',
      message: 'Error',
      description: 'User data is not available please logout and login again',
    });
  }

  const descriptions: Record<string, ReactNode> = {
    Prefix: namePrefix || userData?.namePrefix,
    'Full Name': fullName || userData?.fullName,
    Mobile: phoneNumber || userData?.phoneNumber,
    Email: email || userData?.email,
    Active: active || userData?.active,
    'User Type': userType?.name || userData?.userType?.name,
    Permission: userType?.permission || userData?.userType?.permission,
    'Practioner ID': practitionerId || userData?.practitionerId,
    Provider: provider?.domainName,
    Sentence: provider?.sentence,
    Product: product?.name || userData?.product?.name,
    Password: password,
  };

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      />

      <Card
        className="card-profile-head"
        bodyStyle={{ display: 'none' }}
        title={(
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{fullName || userData?.fullName}</h4>
                  <p>{userType?.name || userData?.userType?.name}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
            )}
      />

      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Notification Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone changes product</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone adds product</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone deletes product</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  ANALYTICS
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Track when I logged in</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Track each product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Users count monthly update</span>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<EditModal data={descriptions} id={ID} />}
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <p className="text-dark">
              Technology :), Like to work in a team, I am a fast learner ...
            </p>
            <hr className="my-25" />
            <Descriptions title={fullName || userData?.fullName}>
              {
                Object.keys(descriptions).map((title: string, index: number) => {
                  if (!descriptions[title]) return;
                  if (title === 'Active') {
                    return (
                      <Descriptions.Item key={title} span={3} label={title}>
                        {descriptions[title] ? 'Active' : 'Inactive'}
                      </Descriptions.Item>
                    );
                  }
                  return (
                    <Descriptions.Item label={title} span={3} key={title}>
                      {Object.values(descriptions)[index]}
                    </Descriptions.Item>
                  );
                })
              }
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
