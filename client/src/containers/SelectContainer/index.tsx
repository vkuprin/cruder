import { Form } from 'antd';
import { memo, ReactNode, CSSProperties } from 'react';
import styles from '../Containers.module.scss';
import StyledSelect from '../../components/StyledSelect';

// ToDo add to global interface
export interface SelectContainerProps {
    label?: string;
    name: string;
    placeholder?: string;
    children?: ReactNode;
    required?: boolean;
    labelStyles?: string;
    componentStyles?: string;
    defaultValue?: string;
    style?: CSSProperties;
}

const SelectContainer = ({
  label = '',
  name = '',
  placeholder = '',
  children = null,
  required = false,
  labelStyles = '',
  defaultValue,
  style,
  ...otherProps
}: SelectContainerProps) => {
  const errorMessage = `Please select label ${label.toLocaleLowerCase()}`;

  return (
    <div className={styles.spacer}>
      <div className={styles.fieldWrapper}>
        <span className={labelStyles || styles.fieldLabel}>
          {label}
        </span>
        <Form.Item
          name={name}
          rules={[{
            required,
            message: errorMessage,
          }]}
        >
          <StyledSelect
            name={name}
            placeholder={placeholder}
            defaultValue={defaultValue}
            style={style}
            {...otherProps}
          >
            {children}
          </StyledSelect>
        </Form.Item>
      </div>
    </div>
  );
};

export default memo(SelectContainer);
