export interface SignUpRequestI {
    id: string;
    practitionerId: string;
    namePrefix?: string;
    userTypeId?: string;
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    active?: boolean;
    providerId?: string;
    password?: string;
}
