import { setTitle } from '../../attributes/all';

class EnumGenderClass {
    @setTitle("Nam")
    Male: number = 1;
    @setTitle("Nữ")
    Female: number = 2
}
export const EnumGender = new EnumGenderClass();