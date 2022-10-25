import { Select } from 'antd';
import { containerTypes } from '../../layouts/RenderLayout';
import { activeStatus } from '../../constants/formData';

const layoutData = [
  {
    type: containerTypes.Input,
    name: 'name',
    label: 'Name',
    placeholder: 'Please enter your name',
    required: true,
  },
  {
    type: containerTypes.Input,
    name: 'description',
    label: 'Description',
    placeholder: 'Please enter your description',
    required: true,
  },
  {
    type: containerTypes.Select,
    name: 'active',
    label: 'Status',
    defaultValue: activeStatus[0].value,
    placeholder: 'Please enter your status',
    children: activeStatus.map((item) => (
      <Select.Option key={item.value} value={item.key}>
        {item.value}
      </Select.Option>
    )),
  },
];

export default layoutData;
