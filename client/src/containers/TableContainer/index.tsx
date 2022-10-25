import { memo, useState } from 'react';
import {
  Form, Table, Button, FormInstance,
} from 'antd';
import cs from 'classnames';
import EditableCell from '../../components/EditableCell';
import TableTitle from '../../components/TableTitle';
import Modal from '../../components/Modal';
import RenderLayout, { containerTypes } from '../../layouts/RenderLayout';

import styles from '../../pages/ProfilePage/components/index.module.scss';

interface TableContainerProps {
    dataFetch: any[];
    columns: any;
    handleAdd: () => void;
    form: FormInstance;
    setEditingKey: (key: string) => void;
    isEditing: any;
    title: string;
    layoutData?: any[];
}

const TableContainer = ({
  dataFetch,
  columns,
  handleAdd,
  layoutData,
  form,
  setEditingKey,
  isEditing,
  title,
  ...otherProps
}: TableContainerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const cancel = () => {
    setEditingKey('');
  };

  const mergedColumns = columns.map((col: {
     editable: boolean;
     dataIndex: string;
     title: string;
 }) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleAddModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  // ToDo - this should be passed as a prop to the table component
  const layoutDataDefault = [
    {
      type: containerTypes.Input,
      name: 'Email',
      label: 'Email',
      placeholder: 'Please enter your email',
      required: true,
    },
    {
      type: containerTypes.Input,
      name: 'Full Name',
      label: 'Full name',
      placeholder: 'Please enter your full name',
      required: true,
    },
    {
      type: containerTypes.Input,
      name: 'phoneNumber',
      label: 'Phone Number',
      placeholder: 'Please enter your phone number',
      required: false,
    },
  ];

  return (
    <Form form={form} component={false}>
      <div className="table-responsive">
        <Table
          title={() => <TableTitle title={title} />}
          loading={dataFetch.length === 0}
          bordered
          dataSource={dataFetch}
          columns={mergedColumns}
          className="ant-border-space"
          rowClassName="editable-row"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          pagination={{
            onChange: cancel,
          }}
          {...otherProps}
        />
      </div>
      <Button
        onClick={handleAddModal}
        type="primary"
        style={{
          // ToDo change to responsive approach
          position: 'relative',
          top: '-48px',
        }}
      >
        Create
      </Button>
      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          onVisible={() => null}
          onCancel={closeModal}
          className={cs('modal filter-modal', styles.editModal)}
          footer={[
            <Button
              key="btn-filter-apply"
              type="primary"
              className="btn btn-primary"
              onClick={() => {
                handleAdd?.();
                closeModal();
              }}
            >
              Save
            </Button>,
          ]}
        >
          <RenderLayout data={layoutData || layoutDataDefault} />
        </Modal>
      )}
    </Form>
  );
};

export default memo(TableContainer);
