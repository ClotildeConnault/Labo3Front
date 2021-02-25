export class User {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    accessLevel : AccessLevel;
    pseudo : string;
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
    ADMINISTRATOR,
}