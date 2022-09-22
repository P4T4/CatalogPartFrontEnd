import { Guid } from "guid-typescript";

export class EnterpriseView {
    enterpriseId: Guid;
    identificationNumber: string;
    businessName: string;
    businessCity: string;
    businessAdress: string;
    businessPhone: string;
    contactPersonEmail?: string;
    contactPersonName?: string;
}