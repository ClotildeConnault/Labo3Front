import { Order } from "./order.model";
import { Product } from "./product.model";
import { PurchaseProductPK } from "./purchaseproductpk.model";

export class PurchaseProduct {

    id : PurchaseProductPK;

    product : Product;

    purchase : Order;

    quantity : number;
  
}