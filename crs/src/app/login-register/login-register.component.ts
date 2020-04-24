import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { usertype } from '../interface/interface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  states:string[]=[];
  password: any;
  usertype: any;
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
  data: data;
  loginsuccess: any;
  loginprogress: any;
  durationInSeconds = 5;
  color: any;
  phonenumbernotavailiable;
  bodyerrormessage:any;

  constructor(private ApiService: ApiService, private router: Router, private _snackBar: MatSnackBar) {
  }
  filteredstates: Observable<string[]>;
  ngOnInit(): void {
    this.loginprogress = false;
    this.loginsuccess = false;
    this.phonenumbernotavailiable = false;
    this.getstatesname();
  }
  getstatesname(){
    this.ApiService.getstatesname()
    .subscribe(
      data=>{
        this.states=data.data;
        // console.log(this.states);
      }
    )
    this.filteredstates = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(value =>this._filter(value))
      );
  }
  private _filter(value: any): any {
    const filterValue = value.toLowerCase()
    return this.states.filter(state=>state.toLocaleLowerCase().includes(filterValue))
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
  usertypeControl = new FormControl('', [Validators.required]);
  usernamecontrol = new FormControl('', [Validators.required]);
  loginpasswordcontrol = new FormControl('', [Validators.required]);
  firstnameControl = new FormControl('', [Validators.required]);
  lastnameControl = new FormControl('', [Validators.required]);
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
  types: usertype[] = [
    { name: 'Student' },
    { name: 'Recruiter' }
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
    if(this.firstname==""||this.lastname==""||this.usertypeControl.value.name==""||this.genderControl.value.name==""||this.date==""||this.email==""||this.telephone==""||this.password==""||this.confirmpassword==""||this.address1==""||this.address2==""||this.city==""||this.state==""||this.postalcode==""){
      return
    }
    let registerpayload = {
      "type": this.usertypeControl.value.name,
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
    }
    this.ApiService.register(registerpayload)
      .subscribe
      (
        data => {
          let loginpayload = {
            "username": this.telephone,
            "password": this.password
          }
          this.ApiService.login(loginpayload)
            .subscribe
            (
              data => {
                this.loginresponse(data);
              },
              error => {
                this.loginsuccess = true;
              }
            )
        },
        error => {
          if(error.error.message=="request body is not appropriate"){
          this.bodyerrormessage = true;
         }
         else{
          this.phonenumbernotavailiable = true;
         }
        }
      )
  }
  registererrormessageclear(){
    this.phonenumbernotavailiable=false;
    this.bodyerrormessage=false;
  }
  login() {
    this.loginprogress = true;
    let loginpayload = {
      "username": this.usernamecontrol.value,
      "password": this.loginpasswordcontrol.value
    }
    this.ApiService.login(loginpayload)
      .subscribe
      (
        data => {
          this.loginprogress = false;
          this.color = 'primary';
          this.loginresponse(data);
        },
        error => {
          this.color = 'warn';
          this.loginsuccess = true;
        }
      )
  }
  loginresponse(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.data);
    this.router.navigate(["profile"]);
  }
  

}

export interface gender {
  name: string;

}

export interface data {
  token: string;
  data: string;
  messsage: string;
  status: any;
}

