export interface UserActivityLogListOuputModel {
    total: number;
    list: UserActivityLogOuputModel[];
}
export interface UserActivityLogOuputModel {
    userId: number;
    userName: string;
    fullName?: string;
    avatar?: string;
    objectId: number;
    actionId: number;
    actionName: string;
    message: string;
    createdDatetimeUtc: number;
    avatarFileId: number;
}

export interface UserActivityLogInputModel {
    objectTypeId: number;
    message: string;
    objectId: number;
}
