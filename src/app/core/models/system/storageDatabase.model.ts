export interface StorageDatabseModel {
  'title': string;
  'moduleTypeId': number;
   selected?: boolean;
}

export interface BackupStorageOutput {
    'backupPoint': number;
    'title': string;
    'backupStorages': BackupStorages[];
}

export interface BackupStorages {
  'moduleTypeId': number;
  'backupPoint': number;
  'fileId': number;
  'fileName': string;
  'backupDate': number;
  'restoreDate': number;
   title?: string;
   isActive?: boolean;
}

export interface BackupStorageInput {
  'title': string;
  'storages': StorageDatabseModel[];
}
