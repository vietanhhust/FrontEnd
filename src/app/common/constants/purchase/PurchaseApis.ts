import { environment } from 'src/environments/environment';

const ApiDomain = environment.apiEndpoint;
export const PurchaseApis = {
    base: `${ApiDomain}`,
    files: `${ApiDomain}files`,
    purchasingsuggest: `${ApiDomain}PurchaseOrder/Suggest`,
    purchasingRequest: `${ApiDomain}PurchaseOrder/Request`,
    purchasingOrder: `${ApiDomain}PurchasingOrder`,
    assignedProcurement: `${ApiDomain}assignedProcurement`,
};
