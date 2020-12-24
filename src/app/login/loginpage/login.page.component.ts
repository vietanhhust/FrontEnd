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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.component.html',
  styleUrls: ['./login.page.component.scss']
})
export class LoginPageComponent implements OnInit {
  returnUrl = '';
  error = '';
  isShowPage = true;
  lstCom = [];
  constructor(
    private authenservice: AuthenticationService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private location: Location
  ) {

  }
  formdata: FormGroup;
  ngOnInit() {
     this.loadCompany();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    document.getElementById('navbar-fixed').style.display = 'none';
    // reset login status
    this.sessionService.clear();
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
      subsidiary_id: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  loadCompany() {
    this.authenservice.getCompany({moduleId: 0}).subscribe(r => {
      this.lstCom = r as any;
      this.formdata.controls['subsidiary_id'].setValue(this.lstCom[0].subsidiaryId);
      this.isShowPage = true;
    }, er => {
      this.isShowPage = true;
    });
  }

  login(data) {
    if (!data.username || !data.password) {
      this.error = 'Bạn chưa nhập tên đăng nhập hoặc mật khẩu!';
      return;
    }
    this.isShowPage = false;
    this.error = null;
    this.authenservice.login(data.username, data.password, data.subsidiary_id)
      .subscribe(
        response => {
          const user = {
            username: data.username,
            token: response.access_token,
            refreshtoken: response.refresh_token,
            subsidiary_id: data.subsidiary_id
          };
          this.sessionService.set(user as UserModel);
          // get current permisson
          this.sessionService
            .loadCurrentModulesPermissions()
            .subscribe(r => {
              if (r) {
                // this.router.navigateByUrl('/');
                //  window.location.href = '/';
                // Ở đây dùng window.location.href thay vì dùng this.router.navigate vì 1 cái là load lại
                setTimeout(() => {
                  this.isShowPage = true;
                  if (this.returnUrl == "\\") {
                    this.location.back();
                  }
                  window.location.href = this.returnUrl;
                }, 500);
              } else {
                this.isShowPage = true;
                this.sessionService.clear();
              }
            }, er => { this.isShowPage = true; });
          // this.router.navigateByUrl(this.returnUrl);
        },
        (error: HttpErrorResponse) => {
          this.isShowPage = true;
          this.error = error.error.error_description + '!';
        });
  }




}
