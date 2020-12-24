export interface CustomGenCodeOutputModel {
    customGenCodeId: number,
    parentId: number,
    customGenCodeName: string,
    codeLength: number,
    prefix: string,
    suffix: string,
    seperator: string,
    lastValue: number,
    lastCode: string,
    isActived: boolean,
    updatedUserId: number,
    createdTime: number,
    updatedTime: number,
    description: string,
    sortOrder: number,
    isDefault: boolean,

    codeFormat: string,
    baseFormat: string,
    
    lastValues: CustomGenCodeBaseValueModel[]
    currentLastValue: CustomGenCodeBaseValueModel

    /*view */
    level?: number,
}

export interface CustomGenCodeBaseValueModel {
    customGenCodeId: number,
    baseValue: string,
    lastValue: number,
    lastCode: string,
    example: string,

}