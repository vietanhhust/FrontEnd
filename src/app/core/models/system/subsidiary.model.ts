import { EmployeeBaseModel } from "./user.model";

export interface SubsidiaryModel {
    subsidiaryId: number;
    parentSubsidiaryId: number;
    subsidiaryCode: string;
    subsidiaryName: string;
    address: string;
    taxIdNo: string;
    phoneNumber: string;
    email: string;
    fax: string;
    description: string;
}

export interface SubsidiaryOwner extends EmployeeBaseModel {
    userId: number;
}

export interface SubsidiaryOutputModel extends SubsidiaryModel {
    owner?: SubsidiaryOwner,

    //display
    ownerDisplay?: string
}

