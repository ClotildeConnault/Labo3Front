import { Category } from "./category.model";
import { Product } from "./product.model";
import { Supplier } from "./supplier.model";

export class ProductPage {
    content: Product[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export class Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    paged: boolean;
}

export class Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}