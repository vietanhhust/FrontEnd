import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { SessionService } from 'src/app/core/services/base/session.service';
import { CMSAuthGuard } from '../guards/cmsAuth.guard';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';

@NgModule({
  providers: [AuthGuard, SessionService, CMSAuthGuard, CMSSessionService]
})
export class GuardModule {}
