import { EnumModuleType } from "src/app/common/constants/global/EnumModuleType"
import { EnumObjectType } from "src/app/common/constants/system/EnumObjectType"

export interface ObjectGenCodeMappingTypeModel {
    objectCustomGenCodeMappingId: number,
    moduleTypeId: number,
    moduleTypeName: string,

    targetObjectTypeId: number,
    targetObjectTypeName: string,

    objectTypeId: EnumObjectType,
    objectTypeName: string,

    configObjectTypeId: number,
    configObjectId: number,
    targetObjectName: string,

    fieldName: string,
    customGenCodeId: number,
    customGenCodeName: string,

    //addition
    moduleTypeName_display: string,
    targetObjectTypeName_display: string,
    fieldName_display: string,
}
