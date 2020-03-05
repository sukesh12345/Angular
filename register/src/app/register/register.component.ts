import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { freeApiService } from '../services/freeapi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Name: any;
  Address: any;
  Email: any;
  Password: any;
  Telephone: any;
  Gender: any;
  Course: any;
  error;
  constructor(private _freeApiService: freeApiService, private _router: Router) { }

  ngOnInit(): void {

  }
  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if ((x >= 48 && x <= 57) || x == 8 ||
      (x >= 35 && x <= 40) || x == 46)
      return true;
    else
      return false;
  }
  register() {
    let arr = {
      "Name": this.Name,
      "Address": this.Address,
      "Email": this.Email,
      "Password": this.Password,
      "Telephone": this.Telephone,
      "gender": this.Gender,
      "Course":this.Course 
    }
    this._freeApiService.register(arr)
    .subscribe
    (
      data => {
        console.log(data);
        this.error="Registered Successfully";
        window.alert("here");
       this.login();
       this.error="";

      },
      error=>{
        this.error="User exists";
         console.log(error);     
      }
    )      
  }
  
  login() {
    this._router.navigate([""]);
  }
}
