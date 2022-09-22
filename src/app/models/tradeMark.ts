import { Guid } from "guid-typescript";

export class TradeMarkView {
    tradeMarkId: Guid;
    tradeMarkCode: number;
    tradeMarkName: string;
    tradeMarkImage64: string;
    isActive: boolean;
    isExternalFrame: boolean;
    codeExternalFrame: string;
}

export class ReferenceTradeMarkView {
    referenceTradeMarkId: Guid;
    tradeMarkId: Guid;
    referenceCode: number;
    referenceName: string;
    isActive: boolean;
    tradeMarkName?: string;
}

export enum RouteTradeMark {
    RouteGetAll = '/GetTradeMarkAll',
    RouteGetAllActive = '/GetTradeMarkAllActive'
}