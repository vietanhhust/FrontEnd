import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/core/services/base/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkCondition(state);
  }

  private checkCondition(state: RouterStateSnapshot): boolean {
    if ( this.sessionService.token !== null) {
      return true;

    } else if (this.sessionService.token == null) {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
