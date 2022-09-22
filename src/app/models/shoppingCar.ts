import { Guid } from 'guid-typescript';

export class ProductoSelectView {
    prodcutId: Guid;
    quantity: number;
}

export class ProductInShoppingCarView {
    productId: Guid;
    tradeMarkName: string;
    modelName: string;
    productName: string;
    referenceCodeProduct: string;
    quantity: number;
    quantityMain: number;
    price: number;
    unitPrice: number;
    isSelect: boolean;
    modelId: Guid;
    taxValueProduct: number;
}

export class SelectPurchasedProductView {
    productId: Guid;
    quantity: number;
}