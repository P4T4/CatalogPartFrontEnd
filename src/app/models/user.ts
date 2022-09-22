import { Guid } from "guid-typescript";

export class LoginRequestView {
  email: string;
  password: string;
}

export class IdentityUserView {
  identityUserId: Guid;
  enterpriseId?: Guid;
  name: string;
  email: string;
  password: string;
  typeUser: number;
  isActive: boolean;
  isTempPassword: boolean;
  token: string;
  contactSellerLink: string;
}

export interface IChangePassUser {
  identityUserId: Guid;
  email: string;
  currentPass: string;
  newPass: string;
  confirmNewPass: string;
  isTempPassword?: boolean;
}

export class InfoUserView {
  infoUserId?: Guid;
  identityUserId: Guid;
  enterpriseId?: Guid;
  identificationNumber: string;
  city: string;
  address: string;
  phone: string;
  contactPerson: string;
  contactSellerLink: string;
}

export interface IUserCreateFromBack {
  enterpriseId: string,
  name: string,
  email: string,
  typeUser: number;
  identificationNumber: string,
  city: string,
  address: string,
  phone: string,
  contactSellerLink: string
}

export enum TypeUser {
  Admin = 1,
  ClientPerson = 2,
  ClientAdminEnterprise = 3,
  ClientUserEnterprise = 4
}
