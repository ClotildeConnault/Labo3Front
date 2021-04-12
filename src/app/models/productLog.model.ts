import { Product } from "./product.model";

export class ProductLog {
    id : number;
    productId : number;
    oldProduct : string;
    newProduct : string;
    userId : number;
    logDate : Date;
}

export class ProductLogWithProducts {
    id : number;
    productId : number;
    oldProduct : Product;
    newProduct : Product;
    userId : number;
    logDate : Date;
}