import { environment } from "src/environments/environment";

const ApiDomain = environment.apiEndpoint;
export const StockApis = {
    base: `${ApiDomain}`,
    files: `${ApiDomain}files`,
    productCates: `${ApiDomain}productCates`,
    productTypes: `${ApiDomain}productTypes`,
    stocks: `${ApiDomain}stocks`,
    location: `${ApiDomain}locations`,
    user: `${ApiDomain}users`,
    products: `${ApiDomain}products` ,
    bom: `${ApiDomain}productBom` ,
    productAttachment: `${ApiDomain}productAttachment` ,
    inventory: `${ApiDomain}inventory` ,
    productUnitConversion: `${ApiDomain}productUnitConversion`,
    packages: `${ApiDomain}packages` ,
    inventoryRequirement: `${ApiDomain}inventoryRequirement` ,
}
