import { Button, Popconfirm, Typography } from 'antd';

interface OperatorsContainerProps {
    save: (id: string) => void;
    edit: (record: any) => void;
    cancel: () => void;
    record: any;
    editingKey: string;
    handleDelete: (id: string) => void;
    editable: boolean;
}

const OperatorsContainer = ({
  save,
  edit,
  record,
  cancel,
  editingKey,
  handleDelete,
  editable,
}: OperatorsContainerProps) => (editable ? (
  <span>
    <Typography.Link
      onClick={() => save(record.id)}
      style={{
        marginRight: 8,
      }}
    >
      Save
    </Typography.Link>
    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      <Button>Cancel</Button>
    </Popconfirm>
  </span>
) : (
  <span>
    <Typography.Link
      style={{
        marginRight: '20%',
      }}
      disabled={editingKey !== ''}
      onClick={() => edit(record)}
    >
      Edit
    </Typography.Link>
    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
      <Typography.Link>Delete</Typography.Link>
    </Popconfirm>
  </span>
));

export default OperatorsContainer;
