import { EnumObjectType } from "src/app/common/constants/system/EnumObjectType";

export interface ObjectCustomGenCodeMapping {
    objectTypeId: number;
    objectId: number;
    customGenCodeId: number;
    targetObjectTypeId: EnumObjectType,
    configObjectTypeId: EnumObjectType,
    configObjectId: number
}
