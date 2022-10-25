import { FormInstance } from 'antd';
import { SetStateAction } from 'react';
import useNotification from '../useNotification';
import isHttpError from '../../utils/api/statusCode';

export interface UseEditTableProps {
    form: FormInstance;
    userData: any;
    setUserData: SetStateAction<any>
    setEditingKey: (editingKey: string) => void;
    ApiServiceUpdate: (id: string, body: Record<string, any>) => Promise<any>;
}

const useEditTable = ({
  form,
  userData,
  setUserData,
  setEditingKey,
  ApiServiceUpdate,
}: UseEditTableProps) => async (id: string) => {
  const row = await form.validateFields();
  const newData = [...userData];
  const index = newData.findIndex((item: Record<string, string>) => id === item.id);

  if (index > -1) {
    const item: Record<string, string> = newData[index];
    ApiServiceUpdate(
      item.id,
      {
        ...row,
      },
    ).then((r) => {
      if (!isHttpError(r.code)) {
        useNotification({
          placement: 'topRight',
          message: 'Successfully Updated',
        });
      } else {
        useNotification({
          placement: 'topRight',
          message: 'Error',
          description: r.message,
        });
      }
    }).catch((err) => {
      useNotification({
        placement: 'topRight',
        message: 'Error',
        description: err.msg,
      });
    });
    newData.splice(index, 1, { ...item, ...row });
    setUserData(newData);
    setEditingKey('');
  } else {
    newData.push(row);
    setUserData(newData);
    setEditingKey('');
  }
};

export default useEditTable;
