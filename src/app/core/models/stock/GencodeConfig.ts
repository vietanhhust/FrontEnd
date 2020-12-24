export interface GencodeConfigOutput {
  objectCustomGenCodeMappingId: number;
  objectTypeId: number;
  objectTypeName: string;
  customGenCodeId: number;
  customCodeName?: string;
}
export interface GencodeConfigInput {
  objectCustomGenCodeMappingId: number;
  objectTypeId: number;
  objectTypeName?: string;
  customGenCodeId: number;
}
export interface GencodeObjectType {
    objectTypeId: number;
    objectTypeName: string;
}

