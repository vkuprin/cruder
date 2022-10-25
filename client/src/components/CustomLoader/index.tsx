import { ReactElement } from 'react';
import { Spin } from 'antd';
import classnames from 'classnames';
import styles from './index.module.scss';

interface ICustomLoader {
    isLoading: boolean,
    children?: ReactElement,
}

const CustomLoader = ({ isLoading, children = <div /> }: ICustomLoader) => {
  if (isLoading) {
    return (
      <div className={classnames('d-flex justify-content-center', styles.loader)}>
        <Spin />
      </div>
    );
  }

  return (
    children
  );
};

export default CustomLoader;
