
export interface packageInput {
     packageId: number;
     inventoryDetailId: number;
     packageCode: string;
     locationId: number;
     date: string;
     expiryTime: string;
     primaryUnitId: number;
     primaryQuantity: number;
     secondaryUnitId: number;
     secondaryQuantity: number;
     createdDatetimeUtc: string;
     updatedDatetimeUtc: string;
     primaryQuantityWaiting: number;
     primaryQuantityRemaining: number;
     secondaryQuantityWaitting: number;
     secondaryQuantityRemaining: number;
     productUnitConversionQuantity: number;
     locationOutputModel: locationOutputModel;
   }
   export interface packageEdit {
     inventoryDetailId: number;
     packageCode: string;
     locationId: number;
     date: string;
     expiryTime: string;
     primaryUnitId: number;
     primaryQuantity: number;
     secondaryUnitId: number;
     secondaryQuantity: number;
     primaryQuantityWaiting: number;
     primaryQuantityRemaining: number;
     secondaryQuantityWaitting: number;
     secondaryQuantityRemaining: number;
   }
export interface locationOutputModel {
     locationId: number;
     stockId: number;
     stockName: string;
     name: string;
     description: string;
     status: 0;
     checked?: boolean;
}
export interface splitPackage {
  toPackages: toPackage[];
}

export interface toPackage {
      packageCode?: string;
      locationId?: number;
      locationName?: string;
      productUnitConversionQuantity?: number;
      primaryQuantity?: number;
      mainQty?: number;
      subQty?: number;
}
export interface joinPackage {
  packageCode?: string;
  locationId?: number;
  mainQty?: number;
  subQty?: number;
  dvcd?: String;
  fromPackageIds: number[];
}
