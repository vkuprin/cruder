import { FormInstance } from 'antd';
import isHttpError from '../../utils/api/statusCode';
import useNotification from '../useNotification';

interface UseAddTableProps {
    form: FormInstance;
    ApiService: (body: any) => Promise<any>;
}

const useAddTable = ({ form, ApiService }: UseAddTableProps) => () => {
  if (Object.values(form.getFieldsValue())
    .every((value) => value === undefined)) {
    return;
  }

  ApiService({
    ...form.getFieldsValue(),
  }).then((r: { code: string; message: any; }) => {
    try {
      if (!isHttpError(r.code)) {
        window.location.reload();
        useNotification({
          placement: 'topRight',
          message: 'Successfully Added',
        });
      } else {
        useNotification({
          placement: 'topRight',
          message: 'Error',
          description: r.message,
        });
      }
    } catch (err: Error | any) {
      useNotification({
        placement: 'topRight',
        message: 'Error',
        description: err.message,
      });
    }
  });
};

export default useAddTable;
