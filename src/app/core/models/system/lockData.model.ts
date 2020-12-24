export interface LockDataConfigModel {
    subsidiaryId?: number,
    id?: number;
    closingDate?: number;
    autoClosingDate?: boolean; 
    freqClosingDate?: {
        frequency: number,
        monthOfYear: number,
        dayOfMonth: number,
        dayOfWeek: number,
        hourInDay: number,
        minuteInHour: number
    }
}
