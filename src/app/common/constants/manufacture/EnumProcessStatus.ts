import { setTitle } from '../../attributes/all';

class EnumProcessStatusClass {
    @setTitle('Chưa taọ')
    Waiting = 1;
    @setTitle('Dở dang')
    Incomplete = 2;
    @setTitle('Hoàn thành')
    Complete = 3;
}
export const EnumProcessStatus = new EnumProcessStatusClass();
