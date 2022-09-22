import { Guid } from "guid-typescript";

export class PurchaseView {
    purchaseId: Guid;
    identityUserId: Guid;
    createdDate: Date;
    subTotal: number;
    taxId: Guid;
    taxValue: number;
    discountId: Guid;
    discountValue: number;
    priceIncreasePercentageId: Guid;
    priceIncreaseValue: number;
    total: number;
    transactionState: number;
    transactionStateLabel: string;
    numberOrder: string;
    purchaseProductList: PurchasedProductView[];
    observation?: string;
}

export class PurchasedProductView {
    purchasedProductId: Guid;
    purchaseId: Guid;
    productId: Guid;
    productName: string;
    unitPrcie: number;
    unitDiscountPrice: number;
    unitTaxPrice: number;
    unitIncreasePrice: number;
    quantity: number;
    totalProductPrice: number;
    totalDiscountPrice: number;
    totalTaxPrice: number;
    totalIncreasePrice: number;
    discountId: Guid;
    purchaseProductState?: number;
    observation?: string;
}

export interface IPurchaseResponseView {
    productId: Guid;
    name: string;
    email: string;
    enterpriseId?: Guid;
    identificationNumber: string;
    businessName: string;
    purchaseId: Guid;
    numberOrder: number;
    createdDate: string;
    subTotal: number;
    taxValue: number;
    discountValue: number;
    total: number;
    transactionState: number;
}

export interface IPurchaseRequestView {
    typeUser: number;
    identityUserId?: Guid;
    enterpriseId?: Guid;
    name: string;
    email: string;
    identificationNumber: string;
    businessName: string;
    numberOrder: number;
    dateBegin: string;
    dateEnd: string;
    transactionState: number;
}


export interface IPurchasedProductResponseView {
    purchaseId: Guid;
    tradeMarkId: Guid;
    tradeMarkName: string;
    referenceTradeMarkId: Guid;
    referenceName: string;
    productId: Guid;
    codeReference: string;
    description: string;
    unitPrice: number;
    unitDiscountPrice: number;
    unitTaxPrice: number;
    quantity: number;
    totalProductPrice: number;
    totalDiscountPrice: number;
    totalTaxPrice: number;
    purchaseProductState: number;
    observation: string;
}

export interface IChangeStatePurchaseProduct {
    purchaseId: string;
    productChangeStateView: IChangeStateProduct[]
}

export interface IChangeStateProduct {
    productId: string;
    purchaseProductState: number;
    observation: string;
}

export enum TransactionStateType {
    Created = 1,
    Approved = 2,
    Dispatched = 3,
    Delivered = 4,
    Cancelled = 5
}

export class TransactionStateTypeName {
    public static states = [
        { name: 'Creado', idState: 1 },
        { name: 'Aprobado', idState: 2 },
        { name: 'Despachado', idState: 3 },
        { name: 'Entregado', idState: 4 },
        { name: 'Cancelado', idState: 5 },
    ]
}