export enum GeneralCode {
    Success = 'GEN-0'
}
declare global {
    interface String {
        isSuccess(): boolean;
    }
}

String.prototype.isSuccess = function(this: string):boolean {
    return this == GeneralCode.Success;
};