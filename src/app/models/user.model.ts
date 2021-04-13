export class User {
    id: number;
    firstName: string;
    lastName: string;
    accessLevel : string;
    username : string;
    password : string;
    address : Address;
}

export class Address {
    street : string;
    number : number;
    zipCode : string;
    city : string;
    country : string;
}

export enum AccessLevel {
    CUSTOMER,
    EMPLOYEE,
    ADMINISTRATOR
}





export const accessLevelLabelMapping: Record<AccessLevel, string> = {
    [AccessLevel.CUSTOMER]: "Client",
    [AccessLevel.EMPLOYEE]: "Employé",
    [AccessLevel.ADMINISTRATOR]: "Administrateur"
};

export const accessLevelMapping: Record<AccessLevel, string> = {
    [AccessLevel.CUSTOMER]: "CUSTOMER",
    [AccessLevel.EMPLOYEE]: "EMPLOYEE",
    [AccessLevel.ADMINISTRATOR]: "ADMINISTRATOR"
};