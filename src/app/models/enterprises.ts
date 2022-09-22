import { Guid } from "guid-typescript";

export class EnterpriseView {
    enterpriseId: Guid;
    identificationNumber: string;
    businessName: string;
    businessCity: string;
    businessAdress: string;
    businessPhone: string;
    isRegister: boolean;
    contactPersonEmail?: string;
    contactPersonName?: string;
}

export interface IEnterpriseEditInfo extends EnterpriseView {
    infoUserId: Guid;
    identityUserId: Guid;
    contactPersonName: string;
    identificationNumberUser: string;
    userCity: string;
    userAdress: string;
    userPhone: string;
    contactSellerLink: string;
    priceIncreasePercentageValue?: string;
}