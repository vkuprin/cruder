import { notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';

interface UseNotificationProps {
    placement: NotificationPlacement;
    message: string;
    description?: string;
}

const useNotification = ({ placement, message, description }: UseNotificationProps) =>
  notification.info({
    message,
    description,
    placement,
  });

export default useNotification;
