import { setTitle } from '../../attributes/all';

class EnumStockOutputRuleClass {
    @setTitle("Không quy định")
    None: number = 0;
    @setTitle("Vào trước ra trước")
    Fifo: number = 1;
    @setTitle("Vào sau ra trước")
    Lifo: number = 2
}
export const EnumStockOutputRule = new EnumStockOutputRuleClass();