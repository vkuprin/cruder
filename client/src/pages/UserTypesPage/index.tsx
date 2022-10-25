import { useState, SetStateAction } from 'react';
import { Form } from 'antd';
import UserTypesService from '../../services/UserTypesService';

import TableContainer from '../../containers/TableContainer';
import OperatorsContainer from '../../containers/OperatorsContainer';
import { UserTypesI } from '../../types/userTypes.interface';
import layoutData from './data';
import useCombineTable from '../../hooks/tableHooks/useCombineTable';

const UsersTypesPage = () => {
  const [userData, setUserData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const { handleAdd, handleCreate, handleDelete } = useCombineTable({
    form,
    setUserData,
    userData,
    setEditingKey,
    GetService: UserTypesService.getUserTypes,
    AddService: UserTypesService.createUserType,
    UpdateService: UserTypesService.updateUserType,
    DeleteService: UserTypesService.deleteUserType,
  });

  const isEditing = (record: { id: string; }) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '45%',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '15%',
      editable: true,
    },
    {
      title: 'permission',
      dataIndex: 'permission',
      width: '20%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: unknown, record: UserTypesI) => {
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
      title="User Types"
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

export default UsersTypesPage;
