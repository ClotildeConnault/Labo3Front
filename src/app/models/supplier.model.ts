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

export const SocialStatutLabelMapping: Record<SocialStatut, string> = {
    [SocialStatut.SA]: "Société Anonyme",
    [SocialStatut.SPRL]: "Société Privée à Responsabilité Limitée"
};

export const SectorLabelMapping: Record<Sector, string> = {
    [Sector.ALIMENTATION]: "Alimentation"
};