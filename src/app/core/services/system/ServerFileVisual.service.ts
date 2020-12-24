import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { ApiService } from 'src/app/core/services/base/api.service';
import { SystemApis } from 'src/app/common/constants/system/SystemApis';
import { EnumMethod, EnumAction } from 'src/app/common/constants/global/Enums';
import { IXModuleContext } from '../../models/base/IXModuleContext';
import { PagingData } from '../../models/base/responedata.model';
import { SubsidiaryModel, SubsidiaryOutputModel } from '../../models/system/subsidiary.model';
import { AppConfig } from 'src/app/common/config/app.config';


@Injectable({
    providedIn: 'root'
})
export class ServerFileVisualService {
//     fileView: string = `${SystemApis.visualDirectory}/view?filePath=`; 
//     constructor(private apiService: ApiService) {
//     }
    
// // Các thao tác với thư mục. 
//     // + Lấy cấu trúc thư mục của server
//     getFolderStruct(context: IXModuleContext){
//         return this.apiService.requestApi<FolderStructModel>(context, `${SystemApis.visualDirectory}/structure`, EnumMethod.Get);
//     }

//     // + Tạo Folder
//     createNewFolder(context: IXModuleContext, model: CreateFolderStructModel){
//         let url = `${SystemApis.visualDirectory}/structure/create?root=${model.root}&subdirectory=${model.subdirectory}`
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post, model);
//     }

//     // + Xóa folder
//     deleteFolder(context: IXModuleContext, directory: string){
//         let url = `${SystemApis.visualDirectory}/structure/delete?directory=${directory}`; 
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Delete);
//     }

//     // + Đổi tên folder
//     renameFolder(context: IXModuleContext, directory: string, newName: string){
//         let url = `${SystemApis.visualDirectory}/structure/rename?directory=${directory}&newName=${newName}`; 
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post);
//     }

//     // + Sao chép folder
//     copyFolder(context: IXModuleContext, directory: string, newDirectory: string){
//         let url = `${SystemApis.visualDirectory}/structure/copy?directory=${directory}&newDirectory=${newDirectory}`; 
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post);
//     } 

//     // + Di chuyển folder
//     moveFolder(context: IXModuleContext, directory: string, newDirectory: string){
//         let url = `${SystemApis.visualDirectory}/structure/move?directory=${directory}&newDirectory=${newDirectory}`; 
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post);
//     } 

// // Các thao tác với files
//     // + Lấy các file theo keyword và thư mục hiện tại (có phân trang)
//     getFiles(context: IXModuleContext, directory: string='', keyword: string= '', page: number = 1, size: number= AppConfig.generate.pagesize){
//         let url = `${SystemApis.visualDirectory}/files?keyWord=${keyword}&directory=${directory}&page=${page}&size=${size}`; 
//         return this.apiService.requestApi<PagingData<FileServerModel>>(context, url, EnumMethod.Get);
//     }

//     // + Post files mới vào thư mục hiện tại.
//     createFiles(context: IXModuleContext, model: CreateFileServerModel){
//         let url = `${SystemApis.visualDirectory}/files/upload`; 
//         let data = new FormData(); 
//         data.append('directory', model.directory);
//         model.files.forEach((item, i )=> {
//             data.append('files', item);
//         });
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post, data);
//     } 

//     // + Xóa files tại thư mục hiện tại
//     deleteFile(context: IXModuleContext, model: FileServerModel[]= []){
//         let url = `${SystemApis.visualDirectory}/files/delete`;
//         let data = [];
//         model.forEach(item=>{
//             data.push(item.path);
//         }) 
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Delete, data);
//     }

//     // + Sao chép file đến thư mục mới 
//     copyFile(context: IXModuleContext, directory: string, files: FileServerModel[]){
//         let url = `${SystemApis.visualDirectory}/files/copy?directory=${directory}`;
//         let paths = []; 
//         files.forEach(item=>{
//             paths.push(item.path);
//         })
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post, paths);
//     }

//     // + Di chuyển file đến thư mục mới
//     moveFile(context: IXModuleContext, directory: string, files: FileServerModel[]){
//         let url = `${SystemApis.visualDirectory}/files/move?directory=${directory}`;
//         let paths = [];
//         files.forEach(item=>{
//             paths.push(item.path);
//         }); 
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post, paths);
//     }

//     // + Đổi tên file 
//     renameFile(context: IXModuleContext, file: string, nfile: string){
//         let url = `${SystemApis.visualDirectory}/files/rename?file=${file}&nfile=${nfile}`;
//         return this.apiService.requestApi<boolean>(context, url, EnumMethod.Post);

//     }

    
}
