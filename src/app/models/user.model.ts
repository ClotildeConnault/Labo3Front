export class User {
    id: number;
    firstName: string;
    lastName: string;
    accessLevel : AccessLevel;
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
    CUSTOMER = 0,
    EMPLOYEE = 1,
    ADMINISTRATOR = 2,
}

export const accessLevelLabelMapping: Record<AccessLevel, string> = {
    [AccessLevel.CUSTOMER]: "Client",
    [AccessLevel.EMPLOYEE]: "Employé",
    [AccessLevel.ADMINISTRATOR]: "Administrateur"
};