import { Select } from 'antd';
import { containerTypes } from '../../layouts/RenderLayout';
import { activeStatus } from '../../constants/formData';

const layoutData = [
  {
    type: containerTypes.Input,
    name: 'domainName',
    label: 'Domain Name',
    placeholder: 'Please enter your domain name',
    required: true,
  },
  {
    type: containerTypes.Input,
    name: 'sentence',
    label: 'Sentence',
    placeholder: 'Please enter your sentence',
    required: true,
  },
  {
    type: containerTypes.Input,
    name: 'url',
    label: 'URL',
    placeholder: 'Please enter your URL',
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
