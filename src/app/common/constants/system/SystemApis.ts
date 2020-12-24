import { environment } from 'src/environments/environment'

const ApiDomain = environment.apiEndpoint;
export const SystemApis = {
    roles: `${ApiDomain}roles`,
    users: `${ApiDomain}users`,
    units: `${ApiDomain}units`,
    barcodeConfigs: `${ApiDomain}barcodeConfigs`,
    customers: `${ApiDomain}customers`,
    genCodeConfigs: `${ApiDomain}GenCodeConfigs`,
    notes: `${ApiDomain}notes`,
    objectGenCode: `${ApiDomain}ObjectGenCode`,    
    businessInfo: `${ApiDomain}businessInfo`,
    avatarUrl: `${ApiDomain}files/`,
    departments: `${ApiDomain}departments`,
    subsidiary: `${ApiDomain}organization/subsidiaries`,
    objectProcess: `${ApiDomain}organization/objectProcess`,
    menu: `${ApiDomain}Menus`,
    storageDatabase: `${ApiDomain}StorageDatabase`,
    subsystems: `${ApiDomain}subsystems`,
    lockConfig: `${ApiDomain}dataConfig`,
    guide: `${ApiDomain}guides`, 
    visualDirectory:  `${ApiDomain}filestorage/media`, 
    step: `${ApiDomain}steps`,
    stepGroup: `${ApiDomain}stepGroups`, 
    categoryGroup: `${ApiDomain}categoryGroup`
};
