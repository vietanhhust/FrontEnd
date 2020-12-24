import { environment } from 'src/environments/environment';

const ApiDomain = environment.apiEndpoint;
export const ManufactureApis = {
    base: `${ApiDomain}`,
    files: `${ApiDomain}files`,
    manufacture: `${ApiDomain}manufacturing`,
    ProductionOrder: `${ApiDomain}manufacturing/ProductOrder`,
    ProductionProcess: `${ApiDomain}productionProcess`,
    ProductSemi: `${ApiDomain}ProductSemi`,
    ProductionSchedule: `${ApiDomain}ProductionSchedule`,
    OutsourcePartRequest: `${ApiDomain}manufacturing/outsourcePartRequest`,
    OutsourceStepRequest: `${ApiDomain}manufacturing/outsourceStepRequest`,
    OutsourceOrder: `${ApiDomain}manufacturing/outsourceOrder`,
    OutsourceStepOrder: `${ApiDomain}manufacturing/outsourceStepOrder`,
    OutsourceTrack: `${ApiDomain}manufacturing/outsourceTrack`,
    ProductionAssignment: `${ApiDomain}productionAssignment`,
    ProductionScheduleTurnShift: `${ApiDomain}manufacturing/ProductionScheduleTurnShift`,
    ProductionHandover: `${ApiDomain}productionHandover`,
};

