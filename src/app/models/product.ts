import { Guid } from "guid-typescript";

export class ProductView {
    productId: Guid;
    referenceTradeMarkId: Guid;
    codeReference: string;
    description: string;
    quantity: number;
    observation: string;
    imageBase64: string;
    unitPrice: number;
    minimumItem: number;
    maximumItem: number;
    isAvailable: boolean;
    tradeMarkId: Guid;
}

export interface LoadProductView {
    tradeMarkName: string;
    tradeMarkIsActive: boolean;
    referenceTradeMarkName: string;
    referenceTradeMarkIsActive: boolean;
    productCodeReference: string;
    productDescription: string;
    productQuantity: number;
    productObservation: string;
    productUnitPrice: number;
    productMinimumItem: number;
    productMaxItem: number;
    productIsAvailable: boolean;
}
