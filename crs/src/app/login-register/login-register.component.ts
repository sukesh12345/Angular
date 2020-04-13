import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  password: any;
  firstname: any;
  lastname: any;
  gender: any;
  email: any;
  telephone: any;
  confirmpassword: any;
  address1: any;
  address2: any;
  city: any;
  state: any;
  postalcode: any;
  companypassword: any;
  companyconfirmpassword: any;
  match: any;
  compare: any;
  hide = true;
  date: any;
  data:data;
  loginsuccess:any;
  durationInSeconds = 5;
  constructor(private ApiService: ApiService, private router: Router,private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginsuccess=false;
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  lastnameFormControl = new FormControl('', []);
  companyemailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  telephoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9_-]{10,12}$')
  ]);
  companytelephoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9_-]{10,12}$')
  ]);
  checkpasswords() {
    if (this.password != this.confirmpassword && this.confirmpassword != '') {
      this.compare = true;
    }
    else {
      this.compare = false;
    }
   }
  companycheckpasswords() {
    if (this.companypassword != this.companyconfirmpassword && this.companyconfirmpassword != '') {
      this.compare = true;
    }
    else {
      this.compare = false;
    }
  }
  confirmpasswordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.compare)
  ]);
  companyconfirmpasswordControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.compare)
  ]);
  usernamecontrol = new FormControl('', [Validators.required]);
  loginpasswordcontrol = new FormControl('', [Validators.required]);
  firstnameControl = new FormControl('', [Validators.required]);
  //  telephoneControl = new FormControl('', [Validators.required]);
  //  telephoneControl= new FormControl('', [Validators.required, Validators.pattern(this.phoneNumber)]);
  genderControl = new FormControl('', [Validators.required]);
  dateControl = new FormControl('', [Validators.required]);
  address1Control = new FormControl('', [Validators.required]);
  address2Control = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  stateControl = new FormControl('', [Validators.required]);
  postalControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  companypasswordControl = new FormControl('', [Validators.required]);
  companynamecontrol = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  genders: gender[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' },
  ];
  minDate = new Date(1997, 0, 1);
  maxDate = new Date(1999, 0, 1);
  restrictAlphabets(e: { which: any; keycode: any; }) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 8 ||
      (x >= 35 && x <= 40) || x == 46)
      return true;
    else
      return false;
  }
  register() {
    let registerpayload = {
      "firstname": this.firstname,
      "lastname": this.lastname,
      "gender": this.genderControl.value.name,
      "date": this.date,
      "email": this.email,
      "telephone": this.telephone,
      "password": this.password,
      "confirmpassword": this.confirmpassword,
      "address1": this.address1,
      "address2": this.address2,
      "city": this.city,
      "state": this.state,
      "postalcode": this.postalcode,
      "type":"Student"
    }
    this.ApiService.register(registerpayload)
      .subscribe
      (
        data => {
          let loginpayload = {
            "username" : this.telephone,
            "password" :this.password
          }
          this.ApiService.login(loginpayload)
          .subscribe
          (
            data=>{
              this.loginresponse(data);
            },
            error=>{
              this.loginsuccess = true;
            }
          )
        },
        error => {
          console.log(error)
        }
      )
  }
  login(){
    let loginpayload = {
      "username" : this.usernamecontrol.value,
      "password" : this.loginpasswordcontrol.value
    }
   this.ApiService.login(loginpayload)
   .subscribe
   (
     data=>{
        this.loginresponse(data);
     },
     error=>{
       this.loginsuccess = true;
     }
   )
  }
  loginresponse(data){
    localStorage.setItem('token',data.token);
    localStorage.setItem('id',data.data);
    this.router.navigate(["profile"]);
  }
}

export interface gender {
  name: string;

}

export interface data{
  token: string;
  data: string;
  messsage : string;
  status: any;
}