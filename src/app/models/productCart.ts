import { Guid } from "guid-typescript";

export class ProductIdView {
        productId: Guid;
        referenceTradeMarkId: Guid;
        codeReference: string;
        description: string;
        quantity: number;
        observation: string;
        imageBase64: string;
        unitPrice:  number;
        minimumItem: number;
        maximumItem: number;
        isAvailable: boolean;
        tradeMarkId: Guid;
    }
