import { Product } from "./product.model";
import { User } from "./user.model";

export class Order {
    id : number;
    reference : string;
    creationDate : Date;
   // products : Product[];
    isPaid : boolean;
   // paymentMethod : PaymentMethod;
    user : User;
}


export enum PaymentMethod {
    PAYPAL, CASH, CREDIT_CARD
}