import { environment } from "src/environments/environment"


const ApiDomain = environment.apiEndpoint;
export const MeApis = {
    tokenEnpoint: `${environment.tokenEndpoint}token`,
    getModuleGroups: `${ApiDomain}modules/moduleGroups`,
    getModules: `${ApiDomain}modules`,
    me: `${ApiDomain}users/me`
}