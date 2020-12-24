
export interface LocationOutput {
    // Id vị trí trong kho
    locationId: number;

    // Mã kho
    stockId: number;

    // Tên kho
    name: string;

    // Mô tả chung về kho
    description:string;

    // Trạng thái
    status: number
}
export interface LocationInput {
    // Id vị trí trong kho
    //locationId: number;

    // Mã kho
    stockId: number;

    // Tên kho
    name: string;

    // Mô tả chung về kho
    description:string;

    // Trạng thái
    status: number
}
