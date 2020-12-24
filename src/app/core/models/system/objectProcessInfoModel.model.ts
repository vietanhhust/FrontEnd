export interface ObjectProcessInfoModel {
    objectProcessTypeId: number;
    objectProcessTypeName: string;
}

export interface ObjectProcessInfoStepModel {
    sortOrder: number;
    objectProcessStepName: string;
    dependObjectProcessStepIds: number[]
    userIds: number[]
}

export interface ObjectProcessInfoStepListModel extends ObjectProcessInfoStepModel {
    objectProcessStepId: number;
}
