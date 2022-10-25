import {
  createContext, ReactNode, useContext, useMemo,
} from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ProductsI } from '../../types/products.interface';
import { UserTypesI } from '../../types/userTypes.interface';

export interface UserContextType {
   userData: {
       product: ProductsI;
       phoneNumber: string;
       namePrefix: string;
       providerId: string;
       name: string;
       active: boolean;
       fullName: string;
       permission: string;
       id: string;
       userType: UserTypesI,
       practitionerId: string;
       email: string
   }
    setUserData: (value: Record<string, UserContextType['userData']>) => void;
}

const UserContext = createContext<UserContextType>(null!);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useLocalStorage('userProvider');

  const value: UserContextType = {
    userData,
    setUserData,
  };

  const memoValue = useMemo(() => value, [value]);

  return <UserContext.Provider value={memoValue}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export {
  UserProvider,
  useUser,
};
