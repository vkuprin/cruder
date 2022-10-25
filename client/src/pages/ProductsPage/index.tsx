import { useState, SetStateAction } from 'react';
import {
  Tag,
  Form,
} from 'antd';

import TableContainer from '../../containers/TableContainer';
import OperatorsContainer from '../../containers/OperatorsContainer';
import { ProviderI } from '../../types/provider.interface';
import layoutData from './data';
import ProductsService from '../../services/ProductsService';
import useCombineTable from '../../hooks/tableHooks/useCombineTable';

const ProductsPages = () => {
  const [userData, setUserData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const { handleAdd, handleCreate, handleDelete } = useCombineTable({
    form,
    setUserData,
    userData,
    setEditingKey,
    GetService: ProductsService.getProducts,
    AddService: ProductsService.createProduct,
    UpdateService: ProductsService.updateProduct,
    DeleteService: ProductsService.deleteProduct,
  });

  const isEditing = (record: { id: string; }) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      sorter: (a: { name: string | any[]; }, b: { name: string | any[]; }) =>
        a.name.length - b.name.length,
    },
    {
      title: 'active',
      dataIndex: 'active',
      width: '15%',
      editable: false,
      render: (tags: string) => (
        tags ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        )
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: unknown, record: ProviderI) => {
        const editable = isEditing(record);
        return (
          <OperatorsContainer
            save={handleCreate}
            cancel={cancel}
            edit={edit}
            record={record}
            editingKey={editingKey}
            handleDelete={handleDelete}
            editable={editable}
          />
        );
      },
    },
  ];

  const editFields = {
    id: '',
    domainName: '',
    active: false,
    parentProviderId: '',
    sentence: '',
  };

  const edit = (record: { id: SetStateAction<string>; }) => {
    form.setFieldsValue({
      ...editFields,
      ...record,
    });
    setEditingKey(record.id);
  };

  return (
    <TableContainer
      title="Products"
      dataFetch={userData}
      columns={columns}
      handleAdd={handleAdd}
      form={form}
      isEditing={isEditing}
      setEditingKey={setEditingKey}
      layoutData={layoutData}
    />
  );
};

export default ProductsPages;
