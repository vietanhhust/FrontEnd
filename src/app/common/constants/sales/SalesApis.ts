import { environment } from 'src/environments/environment';

const ApiDomain = environment.apiEndpoint;
export const SalesApis = {
    base: `${ApiDomain}`,
    files: `${ApiDomain}files`,
    categories: `${ApiDomain}categories`,
    category: `${ApiDomain}categoryconfig`,
    categoryData: `${ApiDomain}categorydata`,
    voucherTypes: `${ApiDomain}PurchasingOrder/config/voucherType`,
    voucherTypeGroup: `${ApiDomain}PurchasingOrder/config/voucherType/groups`,
    bills: `${ApiDomain}PurchasingOrder/data/VoucherBills`,
    actions: `${ApiDomain}PurchasingOrder/VoucherAction`,
};
