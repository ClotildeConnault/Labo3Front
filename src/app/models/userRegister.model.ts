import { AccessLevel, Address } from "./user.model";

export class UserRegister {
    firstName: string;
    lastName: string;
    accessLevel : AccessLevel;
    username : string;
    password : string;
    address : Address;
}