import { setTitle } from '../../attributes/all';

class EnumBarcodeStandardClass {
    @setTitle("Tự do")
    FreeStyle: number = 0;
    @setTitle("EAN-13")
    EAN_13: number = 2
}
export const EnumBarcodeStandard = new EnumBarcodeStandardClass();