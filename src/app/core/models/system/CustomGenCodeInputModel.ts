export interface CustomGenCodeInputModel {
    parentId: number,
    codeLength: number,

    customGenCodeName: string,

    prefix: string,

    suffix: string,

    seperator: string,

    description: string,

    lastValue: number,
    sortOrder: number,
    isDefault: boolean,
    isActived: boolean,

    codeFormat: string,
    baseFormat: string,
}