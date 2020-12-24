import { environment } from 'src/environments/environment';

const ApiDomain = environment.apiEndpoint;
export const ReportApis = {
    base: `${ApiDomain}`,
    files: `${ApiDomain}files`,
    group: `${ApiDomain}reportTypes/Groups`,
    reportType: `${ApiDomain}reportTypes`,
    accountancyReport: `${ApiDomain}reports/accoutancy/view`
};
