import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class Interface {
    constructor() {

    }
}

export interface Stock {
    productCode: string,
    productQuantity: number,
    productPrice: number
}

export interface RemoveStock {
    productCode: string,
    buyerEmail: string,
    itemsBought: number
}

