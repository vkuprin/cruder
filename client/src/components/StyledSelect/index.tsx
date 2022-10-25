import { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import { Select } from 'antd';

import styles from './index.module.scss';

interface StyledSelectProps {
    name: string;
    className?: any;
    children: ReactNode;
    isSuccess?: boolean;
    defaultValue?: string;
    validationErrors?: string[];
    placeholder?: string;
    style?: CSSProperties;
}

const StyledSelect = ({
  className,
  children = null,
  isSuccess = false,
  validationErrors = [],
  defaultValue,
  style,
  ...otherProps
}: StyledSelectProps) => (
  <Select
    className={classnames(styles.selectStyled, {
      [className]: className,
      [styles.stateInvalid]: validationErrors?.length > 0,
      [styles.stateSuccess]: isSuccess,
    })}
    style={style}
    defaultValue={defaultValue}
    {...otherProps}
  >
    {children}
  </Select>
);

export default StyledSelect;
