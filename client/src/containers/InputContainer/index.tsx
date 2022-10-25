import { Form, Input, InputNumber } from 'antd';
import { memo } from 'react';
import styles from '../Containers.module.scss';

interface InputContainerProps {
    label?: string;
    name: string;
    placeholder?: string;
    type?: string;
    required?: boolean;
    labelStyles?: string;
    componentStyles?: string;
    data?: any[];
    number?: boolean;
    defaultValue?: string | number;
}

const InputContainer = ({
  label,
  name,
  data = [],
  required = false,
  number = false,
  defaultValue,
  placeholder,
  labelStyles,
  componentStyles = '',
  ...otherProps
}: InputContainerProps) => (
  <div className={styles.spacer}>
    <div className={styles.fieldWrapper}>
      <div>
        <span className={labelStyles || styles.fieldLabel}>
          {label}
        </span>
        <Form.Item
          name={name}
          rules={[{
            required,
            message: `Please input your ${name}`,
          }]}
          {...otherProps}
        >
          {number
            ? (
              <InputNumber
                className={componentStyles}
                placeholder={placeholder}
              />
            )
            : (
              <Input
                defaultValue={defaultValue}
                className={componentStyles}
                placeholder={placeholder}
              />
            )}
        </Form.Item>
      </div>
    </div>
  </div>
);

export default memo(InputContainer);
