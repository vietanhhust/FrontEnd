var verpData =
{
  "InventoryDetailId": 1,
  "ProductId": 1,
  "PrimaryUnitId": 1,
  "PrimaryQuantity": 8,
  "ProductUnitConversionId": 1,
  "OldProductUnitConversionQuantity": 8,
  "NewProductUnitConversionQuantity": 8,
  "ToPackageId": 1,
  "AffectObjects": [
    {
      "ObjectId": 1,
      "ObjectCode": "PN001",
      "ObjectTypeId": "InventoryDetail",
      "ObjectKey": "InventoryDetail_1",
      "IsRoot": true,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 8,
      "NewProductUnitConversionQuantity": 8,
      "Children": [
        {
          "IsEditable": false,
          "ObjectId": 1,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_1",
          "OldTransferProductUnitConversionQuantity": 8,
          "NewTransferProductUnitConversionQuantity": 8
        }
      ]
    },
    {
      "ObjectId": 1,
      "ObjectCode": "Kiện 01",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_1",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 8,
      "NewProductUnitConversionQuantity": 8,
      "Children": [
        {
          "IsEditable": true,
          "ObjectId": 2,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_2",
          "OldTransferProductUnitConversionQuantity": 2,
          "NewTransferProductUnitConversionQuantity": 2
        },
        {
          "IsEditable": true,
          "ObjectId": 3,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_3",
          "OldTransferProductUnitConversionQuantity": 3,
          "NewTransferProductUnitConversionQuantity": 3
        },
        {
          "IsEditable": true,
          "ObjectId": 4,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_4",
          "OldTransferProductUnitConversionQuantity": 5,
          "NewTransferProductUnitConversionQuantity": 5
        }
      ]
    },
    {
      "ObjectId": 2,
      "ObjectCode": "Kiện 02",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_2",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 2,
      "NewProductUnitConversionQuantity": 2,
      "Children": [
        {
          "IsEditable": true,
          "ObjectId": 11,
          "ObjectTypeId": "InventoryDetail",
          "ObjectKey": "InventoryDetail_11",
          "OldTransferProductUnitConversionQuantity": 2,
          "NewTransferProductUnitConversionQuantity": 2
        }
      ]
    },
    {
      "ObjectId": 11,
      "ObjectCode": "PX01",
      "ObjectTypeId": "InventoryDetail",
      "ObjectKey": "InventoryDetail_11",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 2,
      "NewProductUnitConversionQuantity": 2,
      "Children": null
    },
    {
      "ObjectId": 3,
      "ObjectCode": "Kiện 03",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_3",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 3,
      "NewProductUnitConversionQuantity": 3,
      "Children": [
        {
          "IsEditable": true,
          "ObjectId": 6,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_6",
          "OldTransferProductUnitConversionQuantity": 3,
          "NewTransferProductUnitConversionQuantity": 3
        }
      ]
    },
	{
      "ObjectId": 10,
      "ObjectCode": "Kiện 10",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_10",
      "IsRoot": false,
      "IsCurrentFlow": false,
      "OldProductUnitConversionQuantity": 9,
      "NewProductUnitConversionQuantity": 9,
      "Children": [
        {
          "IsEditable": false,
          "ObjectId": 6,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_6",
          "OldTransferProductUnitConversionQuantity": 7,
          "NewTransferProductUnitConversionQuantity": 7
        }
      ]
    },
    {
      "ObjectId": 6,
      "ObjectCode": "Kiện 06",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_6",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 10,
      "NewProductUnitConversionQuantity": 10,
      "Children": null
    },
    {
      "ObjectId": 5,
      "ObjectCode": "Kiện 05",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_5",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 3,
      "NewProductUnitConversionQuantity": 3,
      "Children": [
        {
          "IsEditable": false,
          "ObjectId": 4,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_4",
          "OldTransferProductUnitConversionQuantity": 3,
          "NewTransferProductUnitConversionQuantity": 3
        }
      ]
    },
    {
      "ObjectId": 4,
      "ObjectCode": "Kiện 04",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_4",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 8,
      "NewProductUnitConversionQuantity": 8,
      "Children": [
        {
          "IsEditable": true,
          "ObjectId": 7,
          "ObjectTypeId": "Package",
          "ObjectKey": "Package_7",
          "OldTransferProductUnitConversionQuantity": 8,
          "NewTransferProductUnitConversionQuantity": 8
        }
      ]
    },
    {
      "ObjectId": 7,
      "ObjectCode": "Kiện 07",
      "ObjectTypeId": "Package",
      "ObjectKey": "Package_7",
      "IsRoot": false,
      "IsCurrentFlow": true,
      "OldProductUnitConversionQuantity": 8,
      "NewProductUnitConversionQuantity": 8,
      "Children": null
    }
  ]
}