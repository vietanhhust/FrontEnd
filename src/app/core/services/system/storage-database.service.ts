import { Injectable } from '@angular/core';
import { EnumMethod } from 'src/app/common/constants/global/Enums';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { ApiService } from 'src/app/core/services/base/api.service';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { BackupStorageInput, BackupStorageOutput, StorageDatabseModel } from '../../models/system/storageDatabase.model';

@Injectable({
  providedIn: 'root'
})
export class StorageDatabaseService {
  constructor(private apiService: ApiService) {
  }

  public getDatabase(context: IXModuleContext) {
    const url = `${SystemApis.subsystems}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<StorageDatabseModel[]>(context, url, method);
  }

  public getBackupPointByDataId(context: IXModuleContext, databaseId: number) {
    const url = `${SystemApis.storageDatabase}/backupPoints/${databaseId}`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<BackupStorageOutput>(context, url, method);
  }

  public getBackupPoints(context: IXModuleContext) {
    const url = `${SystemApis.storageDatabase}/backupPoints`;
    const method = EnumMethod.Get;
    return this.apiService.requestApi<BackupStorageOutput>(context, url, method);
  }

  public Backup(context: IXModuleContext, model: BackupStorageInput) {
    const url = `${SystemApis.storageDatabase}/backup`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<BackupStorageOutput>(context, url, method, model);
  }

  public RestoreByDataId(context: IXModuleContext, backupPoint: number, databaseId: number) {
    const url = `${SystemApis.storageDatabase}/restore/${backupPoint}/${databaseId}`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<BackupStorageOutput>(context, url, method, null);
  }

  public RestoreByBPoint(context: IXModuleContext, backupPoint: number) {
    const url = `${SystemApis.storageDatabase}/restore/${backupPoint}`;
    const method = EnumMethod.Post;
    return this.apiService.requestApi<BackupStorageOutput>(context, url, method, null);
  }
}
