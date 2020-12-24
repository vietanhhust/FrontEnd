import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumModule, EnumGender, EnumUserStatus, EnumAction } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/base/authen.service';
import { UserInput } from 'src/app/core/models/system/user.model';
import { Module } from 'src/app/core/models/system/role.model';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.scss']
})
export class ChangePassComponent extends BaseComponent {

  model: any = { oldPassword: '', newPassword: '' };
  
  error: string;
  data: UserInput;
  isShowPage: boolean;
  constructor(
    private route: ActivatedRoute,
    router: Router,
    sessionService: SessionService,
    private authenservice: AuthenticationService
  ) {
    super(EnumModule.Me, EnumAction.Update, router, sessionService);
  }
  ngOnInit() {
    super.ngOnInit();
  }
  changepass() {
    this.authenservice.changePassword(this,this.model.oldPassword,this.model.newPassword)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/system/users']);
        }
      });
  }

}
