import { Category } from "./category.model";
import { Supplier } from "./supplier.model";

export class Product {
    id : number;
    name : string;
    description : string;
    insertDate : Date;
    updateDate : Date;
    expirationDate : Date;
    price : number;
    quantity : number;
    imagePath : string; 
    TVA : number;
    categories : [Category];
    supplier : Supplier
}