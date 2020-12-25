import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap, finalize, startWith } from "rxjs/operators";
import { AuthenticationService } from 'src/app/core/services/base/authen.service';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { SessionService } from 'src/app/core/services/base/session.service';
import { UserModel } from 'src/app/core/models/base/UserModel';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSAuthenticationService } from 'src/app/core/services/base/cmsAuth.service';

@Injectable()
export class CMSJwtInterceptor implements HttpInterceptor {
    // private refreshTokenInProgress = false;

    //private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private cmsSessionService: CMSSessionService,
        private router: Router,
        private cmsAuthenService: CMSAuthenticationService,
        private toast: ToastMessageService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addAuthenticationToken(request);

        //const currentUser = this.sessionService.user;
        //const isLoggedIn = currentUser && currentUser.token;
        return next.handle(request);
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        const cmsSession = this.cmsSessionService.getCMSSession();
        const isLoggedIn = cmsSession && cmsSession.token;

        if (!isLoggedIn) {
            return request;
        }

        const isApiUrl = request.url.startsWith(environment.apiEndpoint);
        
        if (!isApiUrl) {
            return request;
        }
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${cmsSession.token}`
            }
        });
    }

    // private refreshAccessToken(): Observable<any> {
    //     const currentUser = this.sessionService.user;
    //     const isLoggedIn = currentUser && currentUser.token;

    //     if (!isLoggedIn || !currentUser.refreshtoken) {
    //         this.router.navigate(['/login/']);
    //         this.toast.error(`Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!`);
    //         return of(false);
    //     }

    //     //this.sessionService.clear();
    //     return this.authenService.refreshToken(currentUser.refreshtoken);
    // }
}
