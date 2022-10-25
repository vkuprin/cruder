import { Select } from 'antd';
import { containerTypes } from '../../layouts/RenderLayout';
import { permissions } from '../../constants/formData';

const layoutData = [
  {
    type: containerTypes.Input,
    name: 'name',
    label: 'Name',
    placeholder: 'Please enter your name',
    required: true,
  },
  {
    type: containerTypes.Select,
    name: 'permission',
    label: 'Permission',
    defaultValue: '',
    placeholder: 'Please enter your permission',
    children: permissions.map((item) => (
      <Select.Option key={item.value} value={item.value}>
        {item.value}
      </Select.Option>
    )),
  },
];

export default layoutData;
