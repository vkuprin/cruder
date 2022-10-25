import { SignUpRequestI } from './users.interface';

export interface ProviderI {
    id: string;
    domainName: string;
    sentence: string;
    url: string;
    users: SignUpRequestI[];
}
