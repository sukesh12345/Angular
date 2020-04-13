import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  
  constructor() {
   }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  firstnameControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  genders: gender[] = [
    {name: 'Male' },
    {name: 'Female'},
    {name: 'Others'},
  ];
}
export interface gender {
  name: string;
  
}
