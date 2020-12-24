import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { SessionService } from 'src/app/core/services/base/session.service';

@NgModule({
  providers: [AuthGuard, SessionService]
})
export class GuardModule {}
