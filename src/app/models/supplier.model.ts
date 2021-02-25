import { Product } from "./product.model";

export class Supplier {
    id : number;
    companyName : string;
    statut : SocialStatut;
    sector : Sector;
    insertionDate : Date;
    updateDate : Date;
    products : Product[];
}

export enum SocialStatut {
    SA, SPRL
}

export enum Sector {
    ALIMENTATION
}