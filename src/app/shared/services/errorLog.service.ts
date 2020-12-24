import {OnInit, OnChanges, Renderer2,  Injectable}   from '@angular/core';
import { UNAUTHORIZED } from 'http-status-codes';
import { SessionService } from 'src/app/core/services/base/session.service';
import { storage } from 'src/app/common/helpers/storage';
import { ErrorModel } from 'src/app/core/models/system/ErrorModel';

@Injectable({
    providedIn: 'root'
})
export class ErrorLogService{
    static errorKey = 'error';
    public static topError: ErrorModel[] = []
    constructor(){
    }

    static addError(err: ErrorModel){
        let buffer: ErrorModel[] = JSON.parse(storage.getItem(ErrorLogService.errorKey)) as ErrorModel[];
        console.log(buffer);
        buffer = buffer?buffer: [];
        if(buffer.length < 10){
            buffer.push(err);
        }
        else{
            buffer.shift();
            buffer.push(err);
        }
        storage.setItem(ErrorLogService.errorKey, JSON.stringify(buffer));
    }
}


