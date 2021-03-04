import { Product } from "./product.model";

export class Supplier {
    id : number;
    companyName : string;
    statut : SocialStatut;
    sector : Sector;
    insertionDate : Date;
    updateDate : Date;
    products : Product[];
    inactive : boolean;
}

export enum SocialStatut {
    SA, SPRL
}

export enum Sector {
    ALIMENTATION
}

export const SocialStatutLabelMapping: Record<SocialStatut, string> = {
    [SocialStatut.SA]: "SA",
    [SocialStatut.SPRL]: "SPRL"
};

export const SectorLabelMapping: Record<Sector, string> = {
    [Sector.ALIMENTATION]: "Alimentation"
};