import { Product } from "./product.model";
import { User } from "./user.model";

export class Order {
    id : number;
    reference : string;
    creationDate : Date;
    products : Product[] = [];
    paid : boolean;
    paymentMethod : PaymentMethod;
    user : User;
}


export enum PaymentMethod {
    PAYPAL, CASH, CREDIT_CARD
}

export const PaymentMethodLabelMapping: Record<PaymentMethod, string> = {
    [PaymentMethod.PAYPAL]: "Paypal",
    [PaymentMethod.CASH]: "Liquide",
    [PaymentMethod.CREDIT_CARD]: "Carte de crédit"
};