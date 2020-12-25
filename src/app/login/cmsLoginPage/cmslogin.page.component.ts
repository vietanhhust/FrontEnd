import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/base/authen.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/core/services/base/session.service';
import { UrlServices } from 'src/app/login/UrlServices';
import { Location } from '@angular/common';
import { UserModel } from 'src/app/core/models/base/UserModel';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSAuthenticationService } from 'src/app/core/services/base/cmsAuth.service';

@Component({
  selector: 'app-cmslogin',
  templateUrl: './cmslogin.page.component.html',
  styleUrls: ['./cmslogin.page.component.scss']
})
export class CMSLoginPageComponent implements OnInit {
  returnUrl = '';
  error = '';
  isShowPage = true;
  lstCom = [];
  constructor(
    private cmsAuthenservice: CMSAuthenticationService,
    private cmsSessionService: CMSSessionService,
    private route: ActivatedRoute,
    private location: Location
  ) {

  }
  formdata: FormGroup;
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.getElementById('navbar-fixed').style.display = 'none';
    // reset login status
    this.cmsSessionService.clearStorage();
    this.formdata = new FormGroup({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16)
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16)
        ])
      ),
    });
  }

  loadCompany() {
    
  }

  login(data) {
    if (!data.username || !data.password) {
      this.error = 'Bạn chưa nhập tên đăng nhập hoặc mật khẩu!';
      return;
    }
    this.isShowPage = false;
    this.error = null;
    this.cmsAuthenservice.login(data.username, data.password)
      .subscribe(data => {
          this.cmsSessionService.setCMSSession(data);
          this.cmsSessionService.setCMSPermission(data.role);

          // console.log("Session hiện tại: "  + this.cmsSessionService.getCMSSession()); 
          // console.log("Quyền hiện: " + this.cmsSessionService.getCMSPermission());
          console.log("data: " + data);
          console.log("roles: " + data.role);
          
          setTimeout(()=>{
            this.isShowPage = true; 
            if(this.returnUrl == "\\"){
              this.location.back();
            }
            window.location.href = this.returnUrl
          }, 200);
        },
        (error: HttpErrorResponse) => {
          this.isShowPage = true;
          // this.error = error.error.error_description + '!';
          this.error = error.error.messege
        });
  }




}
