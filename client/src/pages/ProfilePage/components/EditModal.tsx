import { useEffect, useState } from 'react';
import {
  Button, Form, Modal, Select,
} from 'antd';
import RenderLayout, { containerTypes } from '../../../layouts/RenderLayout';
import styles from './index.module.scss';
import { useUser } from '../../../context/UserProvider';
import UsersService from '../../../services/UsersService';
import useNotification from '../../../hooks/useNotification';
import UserTypesService from '../../../services/UserTypesService';
import ProviderService from '../../../services/ProvidersService';
import ProductsService from '../../../services/ProductsService';
import { UserTypesI } from '../../../types/userTypes.interface';
import { activeStatus, prefixTypesData } from '../../../constants/formData';
import { ProviderI } from '../../../types/provider.interface';
import { ProductsI } from '../../../types/products.interface';
import isHttpError from '../../../utils/api/statusCode';

interface EditModalProps {
  data: any | any[];
  id: string | undefined;
}

const EditModal = ({ data, id }: EditModalProps) => {
  const [visible, setVisible] = useState(false);
  const [apiDatas, setApiDatas] = useState<any>();
  const apiData = useUser();
  const { userData, setUserData } = apiData;
  const [form] = Form.useForm();
  const [fields] = useState([]);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    const resultUserType = UserTypesService.getUserTypes();
    const resultProvider = ProviderService.getProviders();
    const resultProducts = ProductsService.getProducts();

    Promise
      .all([resultUserType, resultProvider, resultProducts])
      .then(([userTypes, providers, products]) => setApiDatas({
        userTypes,
        providers,
        products,
      }));
  }, []);

  // TODO more smooth data fom description object
  const layoutData = [
    {
      type: containerTypes.Input,
      name: 'email',
      label: 'Email',
      defaultValue: data?.Email || userData?.email,
      required: true,
    },
    {
      type: containerTypes.Select,
      name: 'userTypeId',
      label: 'User Type',
      defaultValue: data?.['User Type'] || userData?.userType?.id,
      children: apiDatas?.userTypes?.map((item: UserTypesI) => (
        <Select.Option key={item.name} value={item.id}>
          {item.name}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Select,
      name: 'active',
      label: 'Status',
      defaultValue: data?.Active || userData?.active,
      children: activeStatus.map((item) => (
        <Select.Option key={item.value} value={item.key}>
          {item.value}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Select,
      name: 'namePrefix',
      label: 'Prefix',
      defaultValue: data?.Prefix || userData?.namePrefix,
      children: prefixTypesData.map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.value}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Input,
      name: 'fullName',
      label: 'Full name',
      defaultValue: data?.['Full Name'] || userData?.fullName,
    },
    {
      type: containerTypes.Input,
      name: 'phoneNumber',
      label: 'Phone Number',
      defaultValue: data?.Mobile || userData?.phoneNumber,
    },
    {
      type: containerTypes.Input,
      name: 'practitionerId',
      label: 'Practitioner ID',
      defaultValue: data?.['Practioner ID'] || userData?.practitionerId,
    },
    {
      type: containerTypes.Input,
      name: 'password',
      label: 'Password',
      defaultValue: data?.password || userData?.practitionerId,
    },
    {
      type: containerTypes.Select,
      name: 'providerId',
      label: 'Provider',
      defaultValue: data?.Provider || userData?.providerId,
      children: apiDatas?.providers?.map((item: ProviderI) => (
        <Select.Option key={item.id} value={item.id}>
          {item.domainName}
        </Select.Option>
      )),
    },
    {
      type: containerTypes.Select,
      name: 'products',
      label: 'Products',
      defaultValue: data?.Product || userData?.product?.name,
      children: apiDatas?.products?.map((item: ProductsI) => (
        <Select.Option key={item.name} value={item.id}>
          {item.name}
        </Select.Option>
      )),
    },
  ];

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      />
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      />
    </svg>,
  ];

  const onHandleSave = () => {
    UsersService.updateUser(
      id,
      {
        practitionerId: form.getFieldValue('practitionerId') || data?.['Practioner ID'],
        namePrefix: form.getFieldValue('namePrefix'),
        userTypeId: form.getFieldValue('userTypeId'),
        fullName: form.getFieldValue('fullName'),
        email: form.getFieldValue('email'),
        phoneNumber: form.getFieldValue('phoneNumber'),
        active: form.getFieldValue('active'),
        providerId: form.getFieldValue('providerId'),
        productId: form.getFieldValue('products'),
        password: form.getFieldValue('password'),
      },
    ).then((res) => {
      if (!isHttpError(res.code)) {
        useNotification({
          placement: 'topRight',
          message: 'Successfully Edited',
        });
        setVisible(false);
        setUserData(res);
      } else {
        useNotification({
          placement: 'topRight',
          message: 'Error',
          description: res.message,
        });
      }
    }).catch((err) => {
      useNotification({
        placement: 'topRight',
        message: 'Error',
        description: err.message,
      });
    }).finally(() => {
      setVisible(false);
    });
  };

  return (
    <>
      <Button type="link" onClick={showModal}>{pencil}</Button>
      <Modal
        title="Edit Profile"
        open={visible}
        onOk={onHandleSave}
        onCancel={hideModal}
        okText="Save"
        cancelText="Cancel"
        width={500}
        className={styles.editModal}
      >
        <Form
          layout="vertical"
          form={form}
          fields={fields}
          onFinish={onHandleSave}
          className="form"
          requiredMark={false}
          initialValues={data}
        >
          <RenderLayout data={layoutData} />
        </Form>
      </Modal>
    </>
  );
};

export default EditModal;
