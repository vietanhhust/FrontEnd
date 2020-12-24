export interface Department {
    departmentId: number,
    departmentCode: string,
    departmentName: string,
    description: string,
    parentId?: number,
    parentName: string,
    isActived: boolean,
}
