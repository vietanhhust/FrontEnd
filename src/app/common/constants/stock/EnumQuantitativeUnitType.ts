import { setTitle } from '../../attributes/all';

class EnumQuantitativeUnitTypeClass {

    @setTitle("g/m2")
    GamOverAcreageM2: number = 1;

    @setTitle("g/m3")
    GamOverVolumeM3: number = 2
}
export const EnumQuantitativeUnitType = new EnumQuantitativeUnitTypeClass();