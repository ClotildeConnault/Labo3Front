import { Product } from "./product.model";

export class ProductLog {
    id : number;
    productId : number;
    oldProduct : string;
    newProduct : string;
    userId : number;
    logDate : Date;
}