import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactorModel } from 'src/app/models/factor.model';
import { UserModel } from 'src/app/models/user.model';
import { FactorsService } from 'src/app/services/factors.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-acount',
  templateUrl: './my-acount.component.html',
  styleUrls: ['./my-acount.component.scss'],
})
export class MyAcountComponent implements OnInit {
  factorData: FactorModel[] = [];
  isShowDashboard: Boolean = false;
  signupForm!: FormGroup;
  loginForm!: FormGroup;
  updateForm!: FormGroup;
  loginedUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private _userApi: UserService,
    private notification: NotificationService,
    private _invoiceApi: FactorsService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      id: null,
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      address: [''],
    });

    this.updateForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z-0-9._%-]+\\.[a-z]{2,3}')]],
      password: [null, [Validators.required]],
      address: [null, [Validators.required]]
    });

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z-0-9._%-]+\\.[a-z]{2,3}')]],
      password: [null, [Validators.required]]
    });

    this.isCheckLogin();
    
  }

  getFacors(userId : number) {
    this._invoiceApi.getInvoices(userId).subscribe((res) => {
      this.factorData = res;
    });
  }

  signUp() {
    this._userApi.signUp(this.signupForm.value).subscribe(
      (res) => {
        this.notification.showSuccess('?????? ?????? ???? ???????????? ?????????? ????.');
        this.signupForm.reset();
        localStorage.setItem('token', JSON.stringify(res));
        this.isCheckLogin();
      },
      (err) => {
        this.notification.showError('?????? ?????? ???? ?????? ?????????? ????.');
        console.log(err);
      }
    );
    this.isCheckLogin();
  }

  login() {
    this._userApi.getUsers().subscribe((res) => {
      const user = res.find((a: any) => {
        return (
          a.email === this.loginForm.value.email &&
          a.password === this.loginForm.value.password
        );
      });
      if (user) {
        this.notification.showSuccess('???????? ?????? ???????????? ???????? ??????.');
        localStorage.setItem('token', JSON.stringify(user));
        this.isCheckLogin();
      } else {
        this.notification.showError('?????????? ???? ?????? ???????? ?????? ???????????? ???? ????????.');
      }
    });
  }

  updateUserInformation() {
    this._userApi
      .updateUser(this.updateForm.value, this.loginedUser.id)
      .subscribe((res) => {
        this.notification.showSuccess('?????????????? ???? ???????????? ???????? ????.');
      });
  }

  isCheckLogin() {
    const val = localStorage.getItem('token');
    if (val !== null) {
      this.loginedUser = JSON.parse(val);
      this.isShowDashboard = true;
      this.getFacors(this.loginedUser.id);
    }
  }

  exit() {
    localStorage.removeItem('token');
    this.isShowDashboard = false;
    this.notification.showSuccess('???????? ???????????? ???????? ??????.');
  }
}
