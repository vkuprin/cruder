import { ReactNode } from 'react';
import { Modal } from 'antd';

interface ModalProps {
    title?: string;
    children: ReactNode;
    visible: boolean;
    onVisible: () => void;
    onCancel: () => void;
    className?: string;
    footer?: ReactNode;
}

const ModalComponent = ({
  title,
  children,
  visible,
  onVisible,
  onCancel,
  className,
  footer,
  ...otherProps
}: ModalProps) => (
  <Modal
    title={title}
    centered
    visible={visible}
    onOk={onVisible}
    onCancel={onCancel}
    className={className}
    footer={footer}
    {...otherProps}
  >
    {children}
  </Modal>
);

export default ModalComponent;
