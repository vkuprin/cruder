import useNotification from '../useNotification';
import isHttpError from '../../utils/api/statusCode';

interface UseDeleteTableProps {
    serviceDelete: (id: string) => Promise<any>;
    setUserData: (userData: any) => void;
    userData: any;
}

const useDeleteTable = ({ serviceDelete, setUserData, userData }: UseDeleteTableProps) =>
  (id: string) => {
    serviceDelete(id).then((r) => {
      if (!isHttpError(r.code)) {
        setUserData(userData.filter((item: { id: string }) => item.id !== id));
        useNotification({
          placement: 'topRight',
          message: 'Successfully Deleted',
        });
      } else {
        useNotification({
          placement: 'topRight',
          message: 'Error',
          description: r.message,
        });
      }
    }).catch((err: { message: any; }) => {
      useNotification({
        placement: 'topRight',
        message: 'Error',
        description: err.message,
      });
    });
  };

export default useDeleteTable;
