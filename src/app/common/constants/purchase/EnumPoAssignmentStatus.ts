import { setTitle } from '../../attributes/all';

class EnumPoAssignmentStatus {
    @setTitle('Nháp')
    Draff     = 1;
    @setTitle('Đợi xác nhận')
    WaitToConfirm     = 2;
    @setTitle('Đã xác nhận')
    Confirmed   = 3;
}
export const EnumPoAssignmentStatusRule = new EnumPoAssignmentStatus();
