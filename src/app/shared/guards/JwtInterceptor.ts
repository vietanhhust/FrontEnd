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

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;

    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private authenService: AuthenticationService,
        private toast: ToastMessageService
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.addAuthenticationToken(request);

        const currentUser = this.sessionService.user;
        //const isLoggedIn = currentUser && currentUser.token;

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                console.log("có lỗiiiiiiiiiiiiiiiiiiiii"); 
                console.log(error);
                if(error && error.status===400){
                    console.log('zzzzzzzzzzzzzz');
                }
                if (error && error.status === 401) {
                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(request)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;

                        this.refreshTokenSubject.next(null);

                        return this.refreshAccessToken().pipe(
                            switchMap((response) => {

                                if (response.access_token) {
                                    const user = {
                                        username: currentUser.username,
                                        token: response.access_token,
                                        refreshtoken: response.refresh_token
                                    };
                                    this.sessionService.set(user as UserModel);
                                }

                                this.refreshTokenInProgress = false;
                                this.refreshTokenSubject.next(response.access_token);
                                return next.handle(this.addAuthenticationToken(request));
                            }),
                            catchError((err) => {
                                this.refreshTokenInProgress = false;
                                setTimeout(() => {
                                    this.router.navigate(['/login/']);
                                }, 500);
                                return throwError(err);
                            }),
                            finalize(() => this.refreshTokenInProgress = false)
                        );
                    }

                } else if (error && error.status === 403) {
                    //this.toast.error(`Bạn không có quyền thực hiện chức năng này!`);
                    return throwError(error);
                } else {
                    if (error instanceof HttpErrorResponse && error.error instanceof Blob && error.error.type === "application/json") {
                        // https://github.com/angular/angular/issues/19888
                        // When request of type Blob, the error is also in Blob instead of object of the json data
                        console.log("4000000");
                        return new Promise<any>((resolve, reject) => {
                            let reader = new FileReader();
                            reader.onload = (e: Event) => {
                                try {
                                    const errmsg = JSON.parse((<any>e.target).result);
                                    reject(new HttpErrorResponse({
                                        error: errmsg,
                                        headers: error.headers,
                                        status: error.status,
                                        statusText: error.statusText,
                                        url: error.url
                                    }));
                                } catch (e) {
                                    reject(error);
                                }
                            };
                            reader.onerror = (e) => {
                                reject(error);
                            };
                            reader.readAsText(error.error);
                        });
                    }
                    return throwError(error);
                }
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        const currentUser = this.sessionService.user;
        const isLoggedIn = currentUser && currentUser.token;

        if (!isLoggedIn) {
            return request;
        }

        const isApiUrl = request.url.startsWith(environment.apiEndpoint);
        if (!isApiUrl) {
            return request;
        }
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }

    private refreshAccessToken(): Observable<any> {
        const currentUser = this.sessionService.user;
        const isLoggedIn = currentUser && currentUser.token;

        if (!isLoggedIn || !currentUser.refreshtoken) {
            this.router.navigate(['/login/']);
            this.toast.error(`Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!`);
            return of(false);
        }

        //this.sessionService.clear();
        return this.authenService.refreshToken(currentUser.refreshtoken);
    }
}
