import { useEffect } from 'react';
import useNotification from '../useNotification';

interface UseGetTableProps {
    setUserData: (userData: any) => void;
    ApiService: () => Promise<any>;
}

const useGetTable = ({ setUserData, ApiService }: UseGetTableProps) => {
  useEffect(() => {
    const fetchData = async () => {
      await ApiService()
        .then((res: { id: string; }[]) => {
          const newData = res.map((item: { id: string }) =>
            ({ ...item, key: item.id }));
          setUserData(newData);
        })
        .catch((err: { message: string; }) =>
          useNotification({
            placement: 'topRight',
            message: 'Error',
            description: err.message,
          }));
    };
    fetchData();
  }, []);
};

export default useGetTable;
