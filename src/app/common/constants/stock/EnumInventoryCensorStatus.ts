import { setTitle } from '../../attributes/all';

class EnumInventoryCensorStatus {
    @setTitle('Tất cả')
    All    = undefined;
    @setTitle('Đã duyệt')
    Approved    = true;
    @setTitle('Chưa duyệt')
    NotApproved = false;
}
export const enumInventoryCensorStatus = new EnumInventoryCensorStatus();
