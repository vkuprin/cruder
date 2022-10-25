import { Form, Checkbox } from 'antd';
import { memo, ReactNode } from 'react';
import cs from 'classnames';
import styles from '../Containers.module.scss';

interface CheckboxContainerProps {
    label?: string;
    name: string;
    data?: any[];
    required?: boolean;
    children?: ReactNode;
}

const CheckboxContainer = ({
  label,
  name,
  data = [],
  required = false,
  children = [],
  ...otherProps
}: CheckboxContainerProps) => (
  <div className={styles.spacer}>
    <div className={cs(styles.fieldWrapper, 'max-height-group')}>
      <span className={styles.fieldLabel}>
        {label}
      </span>
      <Form.Item
        name={name}
        rules={[{ required }]}
      >
        <Checkbox.Group
          name={name}
          options={data}
          {...otherProps}
        >
          {children}
        </Checkbox.Group>
      </Form.Item>
    </div>
  </div>
);

export default memo(CheckboxContainer);
