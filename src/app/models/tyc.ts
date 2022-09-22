import { Guid } from "guid-typescript";

export interface IConditionsAndTerms {
    termsAndConditionId: Guid;
    description: string;
    createdDate: Date;
    version: string;
    isActive: boolean;
}