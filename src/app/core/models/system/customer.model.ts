export interface CustomerInput {
    customerName: string;
    identify: string;
    customerCode: string;
    customerTypeId: number;
    address: string;
    taxIdNo: string;
    phoneNumber: string;
    website: string;
    email: string;
    description: string;
    isActived: boolean;
    customerStatusId?: number;
    isSelected?: boolean;
    customerId?: number;
    legalRepresentative: string;

    debtDays: number;
    debtLimitation?: number;
    debtBeginningTypeId: number;
    debtManagerUserId?: number;

    loanDays: number;
    loanLimitation?: number;
    loanBeginningTypeId: number;
    loanManagerUserId?: number;

    contacts: CustomerContactModel[];
    bankAccounts: BankAccountModel[];
}
export interface CustomerContactModel {
    customerContactId: number;
    fullName: string;
    genderId: number;
    position: string;
    phoneNumber: string;
    email: string;
}
export interface BankAccountModel {
    bankAccountId: number;
    bankName: string;
    accountNumber: string;
    swiffCode: string;
    bankBranch: string;
    bankAddress: string;
}
export interface CustomerOutput extends CustomerInput {
    total: number;
    list: [
        {
            customerId: number;
            customerName: string;
            customerCode: string;
            customerTypeId: number;
            roleId: number;
            taxIdNo: string;
            phoneNumber: string;
            website: string;
            email: string;
            isSelected?: boolean
        }
    ];
}

