export interface ApiResponse<T> {
    data?: T;
    code: string;
    message: string;
}

export interface PagingData<T> {
    list: T[];
    total: number;
}
export interface PagingDataAddition<TData, TAdditionResult> extends PagingData<TData> {
    additionResult: TAdditionResult;
}

export interface ResponeTokenData {
    expires_in: number;
    access_token: string;
    refresh_token: string;
}
