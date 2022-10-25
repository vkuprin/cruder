import { FormInstance } from 'antd';
import { SetStateAction } from 'react';
import useAddTable from './useAddTable';
import useEditTable from './useEditTable';
import useGetTable from './useGetTable';
import useDeleteTable from './useDeleteTable';

interface UseCombineTableProps {
    form: FormInstance;
    userData: any[];
    setUserData: SetStateAction<any>
    setEditingKey: (editingKey: string) => void;
    GetService: (body: object) => Promise<unknown>;
    UpdateService: (id: string, body: any) => Promise<unknown>;
    DeleteService: (id: string) => Promise<unknown>;
    AddService: (body: any) => Promise<unknown>;
}

const useCombineTable = ({
  form,
  userData,
  setUserData,
  setEditingKey,
  GetService,
  UpdateService,
  DeleteService,
  AddService,
}: UseCombineTableProps) => {
  useGetTable({
    setUserData,
    // @ts-ignore
    ApiService: GetService,
  });

  const handleAdd = useAddTable({
    form,
    ApiService: AddService,
  });

  const handleCreate = useEditTable({
    form,
    userData,
    setUserData,
    setEditingKey,
    ApiServiceUpdate: UpdateService,
  });

  const handleDelete = useDeleteTable({
    userData,
    setUserData,
    serviceDelete: DeleteService,
  });

  return {
    handleAdd,
    handleCreate,
    handleDelete,
  };
};

export default useCombineTable;
