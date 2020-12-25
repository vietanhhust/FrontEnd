import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';

@Injectable()
export class CMSAuthGuard implements CanActivate {
  constructor(
    private cmsSessionService: CMSSessionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkCondition(state);
  }

  private checkCondition(state: RouterStateSnapshot): boolean {
    if ( this.cmsSessionService.getCMSSession() !== null) {
      return true;

    } else if (this.cmsSessionService.getCMSSession() == null) {
      this.router.navigate(['logins'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
